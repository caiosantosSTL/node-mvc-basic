const sequelize = require('./datax/db');
const { render } = require('express/lib/response');

const express = require('express')
const path = require('path')
const pug = require('pug');
const bodyParser = require('body-parser')
require('dotenv').config() // criar arquivo .env

const database = require('./datax/db')
const Model1 = require('./modelx/user')
const Model2 = require('./modelx/car')

require('./relation')

const app = express()
const port = process.env.PORT

// *******************************
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// ** pug
app.set('view engine', 'pug')
// *******************************

app.get('/getinfo', async function (req, res) {
    const userd = await Model1.User.findByPk(1)
    //const userd = await Model1.User.findAll({attributes: ['nome', 'sobrenome']})
    //const userd = await Model1.User.findAll()
    console.log("**** ", userd);
    /*var aux = userd.map(function (user_aux) {
        return { id: user_aux.id, nome: user_aux.nome, sobrenome: user_aux.sobrenome, cardid: user_aux.carid }
    })
    console.log(aux)*/
    //console.log("Todo usuario> ", userd);
    // json parse
    res.send(userd.nome)
})

app.get('/list', async function (req, res) {
    const userd = await Model1.User.findAll()
    //console.log("**** ", userd);
    var aux = userd.map(function(user_aux){
        return {id: user_aux.id, nome: user_aux.nome, sobrenome: user_aux.sobrenome, carid: user_aux.carid}
    })
    console.log(aux)
    //console.log("Todo usuario> ", JSON.stringify(userd, null));
    //const userobj = `{id: ${userd.id}, nome: ${userd.nome}, sobrenome: ${userd.sobrenome}, carid: ${userd.carid}}`
    res.render('lista', {userY: aux})
    //res.render('lista', {userY: userobj})
    //res.send('info')
})

app.get('/pageform', function(req, res){
    res.render('form')
})

app.post('/create', async function(req, res){
    const newUser = await Model1.User.create({
        nome: req.body.nomex,
        sobrenome: req.body.sobrenomex
    })

    res.redirect('/list')
})

app.get('/pageedit/:id', async function(req, res){
    const userEdit = await Model1.User.findByPk(req.params.id)
    console.log("valo em dentro es *** ", req.params.id);

    res.render('formEdit', {idx: userEdit.id, nomeix: userEdit.nome, sobrenomeix: userEdit.sobrenome})
})

app.post('/update/:id', async function(req, res){
    const editUser = await Model1.User.findByPk(req.params.id)
    editUser.nome = req.body.nomex,
    editUser.sobrenome = req.body.sobrenomex
    await editUser.save()

    res.redirect('/list')
})

app.get('/delete/:id', async function(req, res){
    const delUser = await Model1.User.findByPk(req.params.id)
    console.log("------ ", delUser);
    await delUser.destroy()

    res.redirect('/list')
})

// *****************************************************
app.listen(port, async function () {
    console.log(`Rodando no porta ${port}`)

    await sequelize.sync({ force: false }).then(function () { // syncronizar model // si force true, sempre executa drop
        console.log('Conectado a la db');
    }).catch(function (error) {
        console.log('Hay error ', error);
    })
})