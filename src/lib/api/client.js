const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

function buildUrl(endpoint) {
  if (!RAW_BASE) throw new Error('Missing Base Url for API requests');

  const base = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;
  const path = String(endpoint || '').replace(/^\/+/, '');

  return new URL(path, base).toString();
}

async function request(endpoint, options = {}) {
  const url = buildUrl(endpoint);

  const {
    method = 'GET',
    headers,
    body,
    signal
  } = options;

  const hasBody = body !== undefined && body !== null;

  const res = await fetch(url, {
    method,
    headers: {
      ...(hasBody ? { 'Content-Type': 'application/json' } : {}),
      ...(headers || {})
    },
    body: hasBody ? JSON.stringify(body) : undefined,
    signal,
    cache: 'no-store'
  });

  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  const data = isJson ? await res.json().catch(() => null) : await res.text().catch(() => '');

  if (!res.ok) {
    const message =
      (data && typeof data === 'object' && (data.message || data.error)) ||
      `Request failed: ${res.status}`;

    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' })
};
