import { useEffect } from "react";
import { setMeta, setMetaProperty, setLink, setJsonLd } from "@/lib/seo";
import { BRAND, SITE_URL } from "@/lib/brand";

/**
 * Sets per-route title/description/canonical/OG/Twitter/JSON-LD.
 * `path` is the route's hash path (e.g. "/services") — the real, resolvable
 * URL for this HashRouter SPA is `${SITE_URL}#${path}`.
 */
export default function Seo({ title, description, path, image, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;
    setMeta("description", description);

    const canonical = `${SITE_URL}#${path}`;
    setLink("canonical", canonical);

    const absoluteImage = image ? new URL(image, SITE_URL).href : undefined;

    setMetaProperty("og:type", "website");
    setMetaProperty("og:site_name", BRAND.parent);
    setMetaProperty("og:title", title);
    setMetaProperty("og:description", description);
    setMetaProperty("og:url", canonical);
    if (absoluteImage) setMetaProperty("og:image", absoluteImage);

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    if (absoluteImage) setMeta("twitter:image", absoluteImage);

    setJsonLd("seo-jsonld", jsonLd);
  }, [title, description, path, image, jsonLd]);

  return null;
}
