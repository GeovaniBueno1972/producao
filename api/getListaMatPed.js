module.exports = app => {
    
    const getByNumero = (req, res) => {
        const material_pedido = {...req.body}


        app.db.select(['mat_ped.id','mat_ped.pedido_numero', 'materiais.name', 'materiais.unidade', 'mat_ped.quantidade'])
            .table('mat_ped')
            .join('materiais', 'mat_ped.material_id', 'materiais.id')
            .where({ pedido_numero: req.params.id})
            .then(material_pedido => res.json (material_pedido))
            .catch(err => res.status(500).send(err))
    }
    return { getByNumero }
}
