const STORE_ID = "6194482";

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Método no permitido" });
  }
  const token = process.env.TIENDANUBE_ACCESS_TOKEN;
  if (!token) return res.status(500).json({ error: "Falta configurar TIENDANUBE_ACCESS_TOKEN en Vercel." });
  const appName = process.env.TIENDANUBE_APP_NAME || "Fundas Stock";
  const contact = process.env.TIENDANUBE_CONTACT_EMAIL;
  if (!contact) return res.status(500).json({ error: "Configurá TIENDANUBE_CONTACT_EMAIL en Vercel para identificar las solicitudes a la API." });

  try {
    const products = [];
    let page = 1;
    while (page <= 100) {
      const url = `https://api.tiendanube.com/2025-03/${STORE_ID}/products?per_page=200&page=${page}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "User-Agent": `${appName} (${contact})`,
          Accept: "application/json"
        }
      });
      if (!response.ok) {
        const detail = await response.text();
        console.error("Tiendanube API error", response.status, detail.slice(0, 500));
        return res.status(response.status === 401 || response.status === 403 ? 502 : response.status).json({
          error: response.status === 401 || response.status === 403
            ? "Tiendanube rechazó el token o no tiene permiso read_products."
            : `Tiendanube respondió con error ${response.status}.`
        });
      }
      const batch = await response.json();
      if (!Array.isArray(batch) || batch.length === 0) break;
      for (const p of batch) {
        const lang = p.name && (p.name.es || p.name);
        const handle = p.handle && (p.handle.es || p.handle);
        products.push({
          id: p.id,
          name: typeof lang === "string" ? lang : "",
          handle: typeof handle === "string" ? handle : "",
          images: Array.isArray(p.images) ? p.images.map(i => ({ src: i.src || i.url })).filter(i => i.src) : []
        });
      }
      if (batch.length < 200) break;
      page++;
    }
    return res.status(200).json({ storeId: STORE_ID, count: products.length, products });
  } catch (error) {
    console.error("Tiendanube fetch failed", error);
    return res.status(502).json({ error: "No se pudo conectar con la API de Tiendanube." });
  }
};
