// ✅ LD — Servidor Node.js conectado a Neon PostgreSQL (versión estable final)
import express from "express";
import pkg from "pg";
const { Pool } = pkg;

const app = express();
app.use(express.json());

// 🧩 Configurar conexión a Neon
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Crear tabla automáticamente
(async () => {
  const client = await pool.connect();
  await client.query(`
    CREATE TABLE IF NOT EXISTS alertas (
      id SERIAL PRIMARY KEY,
      usuario TEXT NOT NULL,
      mensaje TEXT NOT NULL,
      hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
  client.release();
  console.log("✅ Tabla 'alertas' lista en Neon PostgreSQL");
})();

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("🚀 Servidor activo y conectado correctamente a Neon PostgreSQL");
});

// Endpoint para guardar alertas
app.post("/alerta", async (req, res) => {
  const { usuario, mensaje } = req.body;
  if (!usuario || !mensaje)
    return res.status(400).json({ ok: false, error: "Faltan datos" });
  try {
    await pool.query("INSERT INTO alertas (usuario, mensaje) VALUES ($1, $2)", [
      usuario,
      mensaje,
    ]);
    res.json({ ok: true, mensaje: "✅ Alerta guardada correctamente" });
  } catch (e) {
    console.error(e.message);
    res.status(500).json({ ok: false, error: "Error interno del servidor" });
  }
});

// Endpoint historial
app.get("/historial", async (req, res) => {
  const result = await pool.query("SELECT * FROM alertas ORDER BY id DESC");
  res.json({ ok: true, total: result.rows.length, datos: result.rows });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo correctamente en puerto ${PORT}`)
);
