module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const producao = {...req.body}

        
        if(req.params.id) producao.id = req.params.id

        try{
            existsOrError(producao.pedido_numero, 'Salve o pedido para cadastrar materiais')
            //existsOrError(materiail_pedido.material_id, 'Material não informado')

            //  const materialFromDB = await app.db('mat_ped')
            //     .where({ material_id: material_pedido.material_id}).first()
            
            // if(!materiail_pedido.material_id){
            //     notExistsOrError(materialFromDB, 'Material já cadastrado')
            // }
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(producao.id){
            app.db('producao')
                .update(producao)
                .where({ id: producao.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            console.log(producao)
            app.db('producao')
                .insert(producao)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
            }
    }

    const get = (req, res) => {
        app.db('producao')
            .select('p.id', 'p.data_ini_producao', 'p.pedido_numero', 'u.name as operador', 'p.data_conclusao')
            .table('producao as p')
            .join('users as u' , 'p.user_id', 'u.id')
            .then(producao => res.json(producao))
            .catch(err => res.status(500).send(err))
    }

    

    const getByNumero = (req, res) => {
        app.db('producao')
            .select('p.id', 'p.data_ini_producao', 'p.pedido_numero', 'u.name as operador', 'p.data_conclusao')
            .table('producao as p')
            .join('users as u' , 'p.user_id', 'u.id')
            .where({ pedido_numero: req.params.id})
            .first()
            .then(producao => res.json (producao))
            .catch(err => res.status(500).send(err))
            //console.log(this.material_pedido)
    }

    const getById = (req, res) => {
        app.db('producao')
            .select('id', 'data_ini_producao', 'pedido_numero', 'user_id', 'data_conclusao')
            .where({ id: req.params.id})
            .first()
            .then(producao => res.json (producao))
            .catch(err => res.status(500).send(err))
            //console.log(this.material_pedido)
    }

    const concluido = (req, res) => {
        app.db('producao')
            .where({ pedido_numero: req.params.numero})
            //.update({data_conclusao: 'now'}, ['id', 'data_conclusao'])
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('producao')
                //.update({deletedAt: new Date()})
                .delete()
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Pedido não está em produção.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, getByNumero, concluido, remove }
}