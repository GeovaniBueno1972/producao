module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const materiais = {...req.body}
        //if(req.params.id) materiais.id = req.params.id

        try{
             existsOrError(materiais.codigo, 'Código não informado')
             existsOrError(materiais.nome, 'Nome do material não informado')

             const materialFromDB = await app.db('materiais')
                .where({ codigo: materiais.codigo}).first()
            
            if(!materiais.codigo){
                notExistsOrError(materialFromDB, 'Material já cadastrado')
            }
        } catch (msg){
            return res.status(400).send(msg)
        }

        if(materiais.id){
            app.db('materiais')
                .update(materiais)
                .where({ id: materiais.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('materiais')
                .insert(materiais)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
            }
    }

    const get = (req, res) => {
        app.db('materiais')
            .select( 'codigo', 'nome', 'unidade')
            .then(materiais => res.json(materiais))
            .catch(err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('materiais')
            .select( 'codigo', 'nome', 'unidade')
            .where({ id: req.params.id})
            .first()
            .then(materiais => res.json(materiais))
            .catch(err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        try {
            const rowsUpdated = await app.db('materiais')
                .delete()
                .where({ codigo: req.params.codigo })
            existsOrError(rowsUpdated, 'Material não foi encontrado.')

            res.status(204).send()
        } catch(msg) {
            res.status(400).send(msg)
        }
    }

    return { save, get, getById, remove }
}