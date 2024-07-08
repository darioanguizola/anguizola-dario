
const db = [];

 const postEgreso = (req, res) => {
    const egreso = req.body;            
    db.push(egreso);
    res.status(201).json({ message: 'Egreso almacenado', egreso });
};

 const getEgresos = (req, res) => {
    res.json(db);
};

module.exports={
    postEgreso, getEgresos
}