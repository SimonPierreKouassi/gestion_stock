// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from "App/Models/User";
import Database from "@ioc:Adonis/Lucid/Database";

export default class UsersController {
    async login({request, response, auth, session}){
      const email = request.input('email')
      const password = request.input('password')

      try {
        const login = await auth.use('web').attempt(email, password)
        if (login) {
          session.put('username',login.name)
          session.put('user_email', login.email)
          session.put('user_type', login.user_type)
          response.redirect('/index')
        } else{
          response.redirect('/')
        }
      } catch (error) {
        console.log("erreur de connexion", error)
      }
    }

    async createAdmin ({ request, response }) {

      //const admin_user_type: Number = 1
        const user = await User.create({
          name: request.input('name'),
          email: request.input('email'),
          password:request.input('password'),
          user_type: 1,
        })

        await user.save()
        return response.redirect('/')
    }

    async index ({view}){
      const liste_total_client = await Database.from('clients').where({statut:0}).count('* as total')
      const total_client = liste_total_client[0].total
      const liste_nbre_vente = await Database.from('paiements').where({statut: 1}).count('* as total')
      const total_vente = liste_nbre_vente[0].total
      const total_total_vente = await Database.from('paiements').where({type_paiement:1, statut:1}).sum('montant as montant')
      const calcul_millions = total_total_vente[0].montant >= 1000000 ? (total_total_vente[0].montant / 1000000).toFixed(1) + 'M' : total_total_vente[0].montant;
      const calcul_milliers = total_total_vente[0].montant >= 100000 ? (total_total_vente[0].montant / 1000).toFixed(1) + 'K' : total_total_vente[0].montant;
      const calculnormal = total_total_vente[0].montant <= 1000 ? (total_total_vente[0].montant / 1000) : total_total_vente[0].montant;

      let montant_total_vente = 0
      if(total_total_vente[0].montant >= 100000){
        montant_total_vente = calcul_milliers
      }else if(total_total_vente[0].montant >= 1000000){
        montant_total_vente = calcul_millions
      }else {
        montant_total_vente = calculnormal
      }
      return view.render('pages/index',{total_client,total_vente,montant_total_vente})
    }

    async logout({auth, response}){
      await auth.use('web').logout()
      response.redirect('/')
    }
}
