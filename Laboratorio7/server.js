// server.js

const express = require("express");
const fibonacci = require("./fibonacci");

const app = express();

app.get("/", (req, res) => {
    const n = parseInt(req.query.n, 10);

    if (isNaN(n)) {
        res.status(400).send("Por favor proporciona un número válido.");
        return;
    }

    const { result, series } = fibonacci(n);

    res.json({ n, result, series });
});

app.listen(3000, () => {
    console.log("Servidor escuchando en http://localhost:3000");
});