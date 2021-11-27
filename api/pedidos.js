const Knex = require("knex")

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const pedidos = {...req.body}
        
        if(req.params.numero){
            console.log('numero do pedido' + req.params.numero)
            pedidos.numero= req.params.numero
        } 

        try{
            existsOrError (pedidos.numero, 'Numero não informado')
             
             const pedidoFromDB = await app.db('pedidos')
             .where({ numero: pedidos.numero }).first()
        
        if (!pedidos.id){
             notExistsOrError(pedidoFromDB, 'Pedido já cadastrado')
             }
             
        } catch (msg){
            return res.status(400).send(msg)
        }
        console.log(pedidos)
            app.db( 'pedidos')
                .insert (pedidos)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
            
    }

    const get = (req, res) => {
        app.db.select([ 'p.numero', 'p.data_lancamento', 
        'p.data_entrega', 'u.name as usuario', 'c.name as cliente', 'p.estado', 'c.bairro'])
            .table('pedidos as p')
            .join('users as u', 'p.user_id', 'u.id')
            .join('clientes as c', 'p.cliente_id', 'c.id')
            .orderBy(['p.data_entrega', {column: 'data_lancamento', order: 'asc'}])
            .then (pedidos => res.json (pedidos))
            .catch(err => res.status(500).send(err))
            
    }

    const getData = (req, res) => {
        app.db.select([ 'p.numero', 'p.data_lancamento', 
        'p.data_entrega', 'u.name as usuario', 'c.name as cliente', 'p.estado', 'c.bairro'])
            .table('pedidos as p')
            .join('users as u', 'p.user_id', 'u.id')
            .join('clientes as c', 'p.cliente_id', 'c.id')
            .whereBetween( 'p.data_entrega', [req.body.data_ini, req.body.data_fin])
            .orderBy(['p.data_entrega', {column: 'data_lancamento', order: 'asc'}])
            .then (pedidos => res.json (pedidos))
            .catch(err => res.status(500).send(err))
            
    }

    

    const getAguardando = (req, res) => {
        app.db.select([ 'p.numero', 'p.data_lancamento', 
        'p.data_entrega', 'u.name as usuario', 'c.name as cliente', 'p.estado', 'c.bairro'])
            .table('pedidos as p')
            .join('users as u', 'p.user_id', 'u.id')
            .join('clientes as c', 'p.cliente_id', 'c.id')
            .orderBy(['p.data_entrega', {column: 'data_lancamento', order: 'asc'}])
            .where('p.estado', 'Aguardando')
            .then (pedidos => res.json (pedidos))
            .catch(err => res.status(500).send(err))
            
    }

    const getCliente = (req, res) => {
        app.db.select([ 'p.numero', 'p.data_lancamento', 
        'p.data_entrega', 'u.name as usuario', 'c.name as cliente', 'p.estado', 'c.bairro'])
            .table('pedidos as p')
            .join('users as u', 'p.user_id', 'u.id')
            .join('clientes as c', 'p.cliente_id', 'c.id')
            .orderBy(['p.data_entrega', {column: 'data_lancamento', order: 'asc'}])
            .where('c.name', req.body.name)
            .then (pedidos => res.json (pedidos))
            .catch(err => res.status(500).send(err))
            
    }

    const getNumero = (req, res) => {
        app.db.select([ 'p.numero', 'p.data_lancamento', 
        'p.data_entrega', 'u.name as usuario', 'c.name as cliente', 'p.estado', 'c.bairro'])
            .table('pedidos as p')
            .join('users as u', 'p.user_id', 'u.id')
            .join('clientes as c', 'p.cliente_id', 'c.id')
            .orderBy(['p.data_entrega', {column: 'data_lancamento', order: 'asc'}])
            .where('p.numero', req.body.numero)
            .then (pedidos => res.json (pedidos))
            .catch(err => res.status(500).send(err))
            
    }

    const paraProducao = (req, res) => {
        app.db('pedidos')
            .where({ numero: req.params.numero})
            .update({estado: 'Producao'}, ['numero', 'estado'])
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const paraConcluido = (req, res) => {
        app.db('pedidos')
            .where({ numero: req.params.numero})
            .update({estado: 'Concluido'}, ['numero', 'estado'])
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const paraImpedimento = (req, res) => {
        app.db('pedidos')
            .where({ numero: req.params.numero})
            .update({estado: 'Impedimento'}, ['numero', 'estado'])
            .then(_ => res.status(204).send())
            .catch(err => res.status(500).send(err))
    }

    const getByNumero = (req, res) => {
        app.db.select([ 'p.numero', 'p.data_lancamento', 
        'p.data_entrega', 'u.name as usuario', 'c.name as cliente', 'p.estado', 'c.bairro'])
            .table('pedidos as p')
            .join('users as u', 'p.user_id', 'u.id')
            .join('clientes as c', 'p.cliente_id', 'c.id')
            .where({ numero: req.params.numero})
            .first()
            .then (pedidos => res.json (pedidos))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('pedidos')
                //.update({deletedAt: new Date()})
                .delete()
                .where({ numero: req.params.numero })
            existsOrError(rowsUpdated, 'Pedido não encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getAguardando, getByNumero, getData, 
        paraProducao, paraImpedimento, paraConcluido, remove,
        getCliente, getNumero }
}