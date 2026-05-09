const HN_BASE = 'https://hacker-news.firebaseio.com/v0';
const cache = { items: new Map(), top: { data: null, ts: 0 } };
const TTL = 1000 * 60; // 1 minute cache

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Fetch failed: ' + res.status);
  return res.json();
}

async function getItem(id) {
  const key = String(id);
  const cached = cache.items.get(key);
  if (cached && Date.now() - cached.ts < TTL) return cached.data;
  const data = await fetchJson(`${HN_BASE}/item/${key}.json`).catch(() => null);
  cache.items.set(key, { data, ts: Date.now() });
  return data;
}

async function getTopStories(limit = 50) {
  if (cache.top.data && Date.now() - cache.top.ts < TTL) {
    return cache.top.data.slice(0, limit);
  }
  const ids = await fetchJson(`${HN_BASE}/topstories.json`);
  const topIds = ids.slice(0, Math.min(limit, ids.length));
  const items = await Promise.all(
    topIds.map(async (id) => {
      try {
        return await getItem(id);
      } catch (e) {
        return null;
      }
    })
  );
  cache.top = { data: items, ts: Date.now() };
  return items;
}

module.exports = { getTopStories, getItem };
