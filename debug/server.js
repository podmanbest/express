// server.js
const express = require('express');
const promBundle = require('express-prom-bundle');

const app = express();

// Konfigurasi middleware prometheus
const collectDefaultMetrics = require('prom-client').collectDefaultMetrics;

// Jeda pengumpulan metrik (misalnya setiap 5 detik)
collectDefaultMetrics({ timeout: 5000 });

// Label tambahan seperti 'route' atau 'method' bisa ditambahkan
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeStatus: true,
  customLabels: { project_name: 'express' },
  normalizeStatus: true,
  promClient: {
    collectDefaultMetrics: true,
  },
});

app.use(metricsMiddleware);

// Endpoint Main
app.get('/', (req, res) => {
  res.send('Halo! Ini adalah endpoint root.');
});

// Endpoint untuk akses metrik Prometheus
app.get('/metrics', (req, res) => {
  res.set('Content-Type', promBundle.promClient.register.contentType);
  promBundle.promClient.register
    .metrics()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send(err));
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
});
