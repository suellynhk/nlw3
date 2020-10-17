//importar dependência/lib express (sera usada pra criar o servidor e as rotas)
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

//iniciando o express
const server = express()

//utilizar body do req/corpo da requisição
server.use(express.urlencoded({extended : true}))
//utilizando arquivos estáticos, da pasta public- não possuem alterações depois de criados
//fazendo isso, o express vai criar todas as rotas necessárias automaticamente
server.use(express.static('public'))

//configurar template engine-handlebars(hbs)
.set('views', path.join(__dirname, "views"))
.set('view engine', 'hbs') //renomear todos os aquivos final .html pra .hbs 

//criar uma rota que 
.get('/', pages.index)
.get('/orphanage', pages.orphanage)
.get('/orphanages', pages.orphanages)
.get('/create-orphanage', pages.createOrphanage)
.post('/save-orphanage', pages.saveOrphanage)

//ligar o servidor: pede pra ele 'escutar' a porta (5500)
server.listen(8800)
