// server.js

const express = require("express");
require("./ingresosController");
require("./egresosController");
const app = express();
const PORT = process.env.PORT ?? 3000;




const db = [];

app.get("/ingresosController", (req, res) => {
    const { userId } = req.query;
  res.json({
    data: db.filter((item) => item.type === 'ingreso' && item.userId === userId)
  });
});

app.get('/egresosController', (req, res) => {
  // http://localhost:3000/egresos?userId=1
  const { userId } = req.query;
  res.json({
    data: db.filter((item) => item.type === 'egreso' && item.userId === userId)
  });
});


app.post('/ingresosController', (req, res) => {
  // http://localhost:3000/ingresos?userId=1
  // body: { amount: 100 }
  const { userId } = req.query;
  const { amount } = req.body;
  db.push({ userId, amount, type: 'ingreso' });
  res.json({ message: 'Ingreso creado' });
});

app.post('/egresosController', (req, res) => {
  // http://localhost:3000/egresos?userId=1
  // body: { amount: 100 }
  const { userId } = req.query;
  const { amount } = req.body;
  db.push({ userId, amount, type: 'egreso' });
  res.json({ message: 'Egreso creado' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});