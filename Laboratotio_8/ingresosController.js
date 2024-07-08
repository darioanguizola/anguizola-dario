
let ingresos = [];

 const postIngreso = (req, res) => {
    const ingreso = req.body;
    ingresos.push(ingreso);
    res.status(201).json({ message: 'Ingreso almacenado', ingreso });
};

 const getIngresos = (req, res) => {
    res.json(ingresos);
};

module.exports = {postIngreso,getIngresos};