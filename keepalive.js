const http = require("http");
const url = "https://c0d401ef-95ab-46d3-a65f-a9b774ef774d-00-hyqrmm65tobew.janeway.replit.dev/";

function pingServer() {
  http.get(url, (res) => {
    console.log(`Ping enviado: ${res.statusCode}`);
  }).on("error", (err) => {
    console.log("Error en ping:", err.message);
  });
}

// 🔁 Ejecuta un ping cada 60 segundos
setInterval(pingServer, 60 * 1000);

console.log("⏳ KeepAlive activo: enviando pings cada 60 segundos...");
