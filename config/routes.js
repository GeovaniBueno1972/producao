module.exports = app => {
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/operador')
        .all(app.config.passport.authenticate())
        .post(app.api.user.save)
        .get(app.api.user.getOperador)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.user.save)
        .get(app.api.user.getById)
        .delete(app.api.user.remove)
    
    app.route('/materiais')
        .all(app.config.passport.authenticate())
        .post(app.api.materiais.save)
        .get(app.api.materiais.get)

    app.route('/materiais/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.materiais.save)
        .get(app.api.materiais.getById)
        .delete(app.api.materiais.remove)

    app.route('/material_pedidos')
        .all(app.config.passport.authenticate())
        .post(app.api.materiaisPedidos.save)
        .get(app.api.materiaisPedidos.get)
        
    app.route('/materialpedidos/:id')
        .get(app.api.getListaMatPed.getByNumero)

    app.route('/material_pedidos/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.materiaisPedidos.save)
        .get(app.api.materiaisPedidos.getById)
        .delete(app.api.materiaisPedidos.remove)
    
    app.route('/clientes')
        .all(app.config.passport.authenticate())
        .post(app.api.clientes.save)
        .get(app.api.clientes.get)

    app.route('/clientes/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.clientes.save)
        .get(app.api.clientes.getById)
        .delete(app.api.clientes.remove)

    app.route('/pedidos')
        .all(app.config.passport.authenticate())
        .post(app.api.pedidos.save)
        .get(app.api.pedidos.get)

    app.route('/pedidos/:numero')
        .all(app.config.passport.authenticate())
        .put(app.api.pedidos.save)
        .get(app.api.pedidos.getByNumero)
        .delete(app.api.pedidos.remove)

    app.route('/pedidos_producao/:numero')
        .all(app.config.passport.authenticate())
        .put(app.api.pedidos.paraProducao)
    
    app.route('/pedidos_impedimento/:numero')
        .all(app.config.passport.authenticate())
        .put(app.api.pedidos.paraImpedimento)
    
    app.route('/pedidos_concluido/:numero')
        .all(app.config.passport.authenticate())
        .put(app.api.pedidos.paraConcluidopedidos)

    app.route('/pedidos_aguardando')
        .all(app.config.passport.authenticate())
        .put(app.api.pedidos.save)
        .get(app.api.pedidos.getAguardando)
        .delete(app.api.pedidos.remove)

    app.route('/producao')
        .all(app.config.passport.authenticate())
        .put(app.api.producao.save)
        .post(app.api.producao.save)
        .get(app.api.producao.get)
        .delete(app.api.producao.remove)

    app.route('/producao/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.producao.save)
        .get(app.api.producao.getByNumero)
        .delete(app.api.producao.remove)

    app.route('/concluido/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.producao.concluido)
        
}