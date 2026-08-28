// src/i18n/loadNamespaces.js
import { fetchNamespace } from "./apiLoader";
import { getCachedNamespace, setCachedNamespace } from "./cache";
import i18n from "./index";

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

// tracks in-flight requests so concurrent screens don't double-fetch the same ns
const inFlight = new Map();

// tracks the last time we checked freshness for a given lng:ns pair,
// so hasResourceBundle being true doesn't permanently block revalidation
const lastCheckedAt = new Map();

const loadOne = async (lng, ns) => {
  const key = `${lng}:${ns}`;

  const alreadyLoaded = i18n.hasResourceBundle(lng, ns);
  const lastChecked = lastCheckedAt.get(key) || 0;
  const dueForRecheck = Date.now() - lastChecked > MAX_AGE_MS;
  console.log({ dueForRecheck });

  // if it's already in memory AND we checked recently, nothing to do
  if (alreadyLoaded && !dueForRecheck) return;

  if (inFlight.has(key)) return inFlight.get(key);

  const task = (async () => {
    // mark this check as "done now" up front, so overlapping calls
    // during this same run don't also think a recheck is due
    lastCheckedAt.set(key, Date.now());

    const cached = await getCachedNamespace(lng, ns, MAX_AGE_MS);

    if (cached) {
      if (!alreadyLoaded) {
        i18n.addResourceBundle(lng, ns, cached.data, true, true);
      }

      if (cached.isStale) {
        // don't block the caller — refresh quietly in the background
        fetchNamespace(lng, ns).then((fresh) => {
          if (fresh && Object.keys(fresh).length) {
            setCachedNamespace(lng, ns, fresh);
            i18n.addResourceBundle(lng, ns, fresh, true, true);
          }
          // empty/failed background refresh: keep serving stale cache,
          // don't touch the resource bundle, nothing marked sticky
        });
      }
      return;
    }

    // no cache at all — this fetch blocks, since there's nothing to show yet
    const fresh = await fetchNamespace(lng, ns);
    if (fresh && Object.keys(fresh).length) {
      await setCachedNamespace(lng, ns, fresh);
      i18n.addResourceBundle(lng, ns, fresh, true, true);
    }
    // if fetch failed/empty: deliberately do NOT addResourceBundle.
    // hasResourceBundle stays false, so the NEXT call to loadOne retries
    // instead of permanently treating this ns as "loaded but empty".
  })();

  inFlight.set(key, task);
  try {
    await task;
  } finally {
    inFlight.delete(key);
  }
};

const SUPPORTED_LANGUAGES = ["en", "fr", "pt"];

export const loadNamespaces = async (namespaces, lng) => {
  const targetLng = lng || i18n.language;

  // block only on the language actually needed right now
  await Promise.all(namespaces.map((ns) => loadOne(targetLng, ns)));

  // warm the other languages quietly — fire-and-forget, don't await
  const otherLangs = SUPPORTED_LANGUAGES.filter((l) => l !== targetLng);
  for (const ns of namespaces) {
    for (const lng2 of otherLangs) {
      loadOne(lng2, ns).catch(() => {});
    }
  }
};

// call after a language switch so already-loaded namespaces get refetched
// for the new language, instead of relying only on cache misses
export const reloadNamespacesForLanguage = async (lng) => {
  const active = Object.keys(
    i18n.services.resourceStore.data[i18n.language] || {},
  );
  await loadNamespaces(active.length ? active : ["home"], lng);
};
