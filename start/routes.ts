/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

//auth pages
Route.on('/').render('pages.authentification.sign-in')
Route.on('/sign-up').render('pages.authentification.sign-up')
Route.post('/login','UsersController.login')
Route.post('/createAdmin','UsersController.createAdmin')
Route.post('/logout', 'UsersController.logout')

//index page
Route.get('/index','UsersController.index')

//products pages
Route.get('/list-product','ProduitsController.index')
Route.on('/add-product').render('pages.add-product')
Route.post('/create-product','ProduitsController.create').as('create-product')
Route.get('/produit_details/:id', 'ProduitsController.show')
Route.post('/update_produit','ProduitsController.update')
Route.get('/delete_produit/:id','ProduitsController.delete')

//type de produit
Route.get('/type-produit','TypeProduitsController.index')
Route.get('/add-type','TypeProduitsController.addTypeForm')
Route.post('/create-type-produit','TypeProduitsController.create')
Route.post('/update-type-produit','TypeProduitsController.update')
Route.post('/delete-type-produit/:id','TypeProduitsController.delete')
Route.get('/type-produit-details/:id','TypeProduitsController.show')

//commercial pages
Route.on('/add-users').render('pages.add-users')
Route.get('/list-users','CommercialsController.index')
Route.get('/commercial_details/:id', 'CommercialsController.show')
Route.post('/update_commercial','CommercialsController.update')
Route.post('/delete-commercial/:id','CommercialsController.delete')
Route.post('/create-commercial', 'CommercialsController.create')

//client pages
Route.get('/list-customers','ClientsController.index')
Route.get('/add-customers','ClientsController.list_commerciaux')
Route.post('/create-customer','ClientsController.create')
Route.get('/client_details/:id','ClientsController.show')
Route.post('/update-client','ClientsController.update')

//gestion des paiements des bons

Route.get('/liste-paiements','PaiementsController.index')
Route.get('/paiement/:id','PaiementsController.makePaiement')
Route.post('/create-paiement','PaiementsController.create')

//gestion des bons

Route.get('/nouveau-bon/list-commerciaux','BonsController.chooseCommerciaux')
Route.get('/nouveau-bon/:id_com','BonsController.chooseClient')
Route.get('/:idcom/:idclient','BonsController.FormulaireBon')
Route.post('/create-bon','BonsController.create')
Route.get('/list-bon','BonsController.index')
Route.get('/:id', 'BonsController.addProduct')
Route.post('/create-bon-produit','BonsController.createBonProduct')
Route.post('/finish-bon','BonsController.finishBon')


// Route.on('/list-sale').render('pages.list-sale')
// Route.on('/add-sale').render('pages.add-sale')
// Route.on('/list-suppliers').render('pages.list-suppliers')
// Route.on('/list-supplier').render('pages.list-supplier')
// Route.on('/sign-in').render('pages.sign-in')
// Route.on('/sign-up').render('pages.authentification.sign-up')
// Route.on('/recover-password').render('pages.recover-password')
// Route.on('/confirm-mail').render('pages.confirm-mail')
// Route.on('/lock-screen').render('pages.lock-screen')
// Route.on('/form-element').render('pages.form-element')
// Route.on('/form-input').render('pages.form-input')
// Route.on('/form-validation').render('pages.form-validation')
// Route.on('/form-switch').render('pages.form-switch')
// Route.on('/form-chechbox').render('pages.form-chechbox')
// Route.on('/form-radio').render('pages.form-radio')
// Route.on('/form-textarea').render('pages.form-textarea')
// Route.on('/invoice').render('pages.invoice')
// Route.on('/error-404').render('pages.error-404')
// Route.on('/error-500').render('pages.error-500')
// Route.on('/blank-page').render('pages.blank-page')
