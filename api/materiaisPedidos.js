module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const material_pedido = {...req.body}
        if(req.params.id) material_pedido.id = req.params.id

        try{
            existsOrError(material_pedido.pedido_numero, 'Salve o pedido para cadastrar materiais')
            //existsOrError(materiail_pedido.material_id, 'Material não informado')

            //  const materialFromDB = await app.db('mat_ped')
            //     .where({ material_id: material_pedido.material_id}).first()
            
            // if(!materiail_pedido.material_id){
            //     notExistsOrError(materialFromDB, 'Material já cadastrado')
            // }
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(material_pedido.id){
            app.db('mat_ped')
                .update(material_pedido)
                .where({ id: material_pedido.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            console.log(material_pedido)
            app.db('mat_ped')
                .insert(material_pedido)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
            }
    }

    const get = (req, res) => {
        app.db('mat_ped')
            .select('id', 'pedido_numero', 'material_id', 'quantidade')
            .then(material_pedido => res.json(material_pedido))
            .catch(err => res.status(500).send(err))
    }

    const getByNumero = (req, res) => {
        app.db('mat_ped')
            .select('id', 'pedido_numero', 'material_id', 'quantidade')
            .where({ pedido_numero: req.params.id})
            //.first()
            .then(material_pedido => res.json (material_pedido))
            .catch(err => res.status(500).send(err))
            //console.log(this.material_pedido)
    }

    const getById = (req, res) => {
        app.db('mat_ped')
            .select('id', 'pedido_numero', 'material_id', 'quantidade')
            .where({ id: req.params.id})
            .first()
            .then(material_pedido => res.json (material_pedido))
            .catch(err => res.status(500).send(err))
            //console.log(this.material_pedido)
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('mat_ped')
                //.update({deletedAt: new Date()})
                .delete()
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Material não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getByNumero, remove }
}