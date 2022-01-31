module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const clientes = {...req.body}
        //if(req.params.id) clientes.id = req.params.id

        console.log('Aqui')
        console.log(clientes)

        try{
             existsOrError (clientes.name, 'Nome não informado')
             existsOrError (clientes.fone, 'Telefone não informado')

             
        } catch (msg){
            return res.status(400).send(msg)
        }

        if (clientes.id){
            console.log('Inserindo')
            app.db( 'clientes')
                .insert (clientes)
                .then(clientes => res.status(204).send(clientes))
                .catch(err => res.status(500).send(err))
            
        } else {
            app.db( 'clientes')
                .update (clientes)
                .where({ id: clientes.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
            }
    }

    const get = (req, res) => {
        app.db( 'clientes')
            .select('id', 'name', 'fone', 'bairro')
            .orderBy('name', 'asc')
            .then (clientes => res.json (clientes))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db( 'clientes')
            .select('id', 'name', 'fone', 'bairro')
            .where({ id: req.params.id})
            .first()
            .then (clientes => res.json (clientes))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('clientes')
                //.update({deletedAt: new Date()})
                .delete()
                .where({ id: req.params.id })
            existsOrError(rowsUpdated, 'Cliente não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}