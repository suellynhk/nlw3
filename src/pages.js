//esse arquivo vai conter as funções das rotas
//importando a pagina
const Database = require('./database/db')
const saveOrphanage = require('./database/saveOrphanage')

//exportando um objeto
module.exports = {
    //função que recebe dois argumentos(request, response)-pedidos e respostas e renderiza a página
    //obs: lembrar de renomear os caminhos para as paginas no doc html, tirando o html do final e colocando /na frente ex: /orphanage
    index(req, res) {
        return res.render('index')//renderiza a pagina
    },

    async orphanage(req, res) {
        const id = req.query.id
        try{
            const db= await Database;
            const results= await db.all(`SELECT * FROM orphanages where id="${id}"`)
            const orphanage = results[0]
            //função split vai procurar todas as virgulas, toda virgula que achar faz uma quebra e transforma os dados num array
            orphanage.images = orphanage.images.split(",")
            orphanage.firstImage = orphanage.images[0]
            //if ternario:  condicao ? valorSeTrue : valorSeFalse;
            orphanage.open_on_weekends == "0" ? orphanage.open_on_weekends = false : orphanage.open_on_weekends = true;

            return res.render('orphanage', {orphanage})
        }catch (error) { 
            console.log(error)
            return res.send('Erro no banco de dados!')
        }
        
    },

    async orphanages(req, res) {
        try {
            const db = await Database;
            const orphanages= await db.all("SELECT * FROM orphanages")
            return res.render('orphanages', { orphanages })
        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados!')
        } 
    },

    createOrphanage(req, res) {
        return res.render('create-orphanage')
    },

   async saveOrphanage(req, res) {
        const fields = req.body;
        //validar se todos os campos estão preenchidos, verifica no array se há algo vazio
        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos! Não esqueça de selecionar um ponto no mapa')
        }

        try{
             //salvar um orfanato
            const db = await Database;
            await saveOrphanage(db, {
                lat:fields.lat,
                lng:fields.lng,
                name:fields.name,
                about:fields.about,
                whatsapp:fields.whatsapp,
                images:fields.images.toString(),
                instructions:fields.instructions,
                opening_hours:fields.opening_hours,
                open_on_weekends:fields.open_on_weekends,
            })
            //redirecionamento
            return res.redirect('/orphanages')

        } catch (error) {
            console.log(error)
            return res.send('Erro no banco de dados!')
        }
    }

}