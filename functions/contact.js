// POST /contact — contact-form handler (Cloudflare Pages Function).
//
// Why this exists: the form used to POST straight to a public Make.com webhook,
// so anyone could hit that URL directly and spam it. This Function sits in
// front, verifies a Cloudflare Turnstile token server-side, re-validates every
// field, and only then forwards to Make. The webhook URL lives in an env var,
// so it never ships to the browser.
//
// Required environment variables (Cloudflare Pages → Settings → Environment variables):
//   TURNSTILE_SECRET_KEY  — secret key from your Turnstile widget (encrypt it)
//   MAKE_WEBHOOK_URL      — the hook.us2.make.com/... URL (encrypt it)

const LIMITS = { name: 100, email: 200, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(status, body) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  // Reject cross-origin callers so the endpoint can't be used as a spam relay.
  // Same-origin only: the form is served from this same deployment, so a
  // legitimate Origin matches the Function's own origin (works on the apex
  // domain and on *.pages.dev previews alike). A different Origin = relay abuse.
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) {
    return json(403, { ok: false, error: 'Forbidden.' });
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.MAKE_WEBHOOK_URL) {
    console.error('contact: missing TURNSTILE_SECRET_KEY or MAKE_WEBHOOK_URL env var');
    return json(500, { ok: false, error: 'Server not configured.' });
  }

  // Parse body defensively.
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid request.' });
  }

  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();
  const company = String(data.company || '').trim(); // honeypot
  const token = String(data.turnstileToken || '').trim();

  // Honeypot: real users never see this field. If it's filled, pretend success
  // so the bot moves on, but forward nothing.
  if (company) {
    return json(200, { ok: true });
  }

  // Server-side validation (the browser's is cosmetic).
  if (!name || !email || !message) {
    return json(400, { ok: false, error: 'All fields are required.' });
  }
  if (name.length > LIMITS.name || email.length > LIMITS.email || message.length > LIMITS.message) {
    return json(400, { ok: false, error: 'One or more fields are too long.' });
  }
  if (!EMAIL_RE.test(email)) {
    return json(400, { ok: false, error: 'Please enter a valid email.' });
  }
  if (!token) {
    return json(400, { ok: false, error: 'Please complete the challenge.' });
  }

  // Verify Turnstile server-side.
  const verifyBody = new FormData();
  verifyBody.append('secret', env.TURNSTILE_SECRET_KEY);
  verifyBody.append('response', token);
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) verifyBody.append('remoteip', ip);

  let verify;
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: verifyBody,
    });
    verify = await r.json();
  } catch {
    return json(502, { ok: false, error: 'Verification unavailable. Try again shortly.' });
  }
  if (!verify.success) {
    return json(403, { ok: false, error: 'Challenge failed. Please try again.' });
  }

  // Forward to Make.
  try {
    const r = await fetch(env.MAKE_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message,
        source: 'omar-flores-website',
        timestamp: new Date().toISOString(),
      }),
    });
    if (!r.ok) {
      console.error('contact: make webhook returned', r.status);
      return json(502, { ok: false, error: 'Could not send right now. Try again shortly.' });
    }
  } catch {
    return json(502, { ok: false, error: 'Could not send right now. Try again shortly.' });
  }

  return json(200, { ok: true });
}
