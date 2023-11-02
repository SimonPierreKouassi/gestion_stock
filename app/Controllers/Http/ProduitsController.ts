// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database'
import Produit from "App/Models/Produit";
import { string } from "@ioc:Adonis/Core/Helpers";
import  Drive  from "@ioc:Adonis/Core/Drive";

export default class ProduitsController {
    async create({request, response}){
            const produit = await Produit.create({
                name: request.input('name'),
                code: request.input('code'),
                prix_entreprise: request.input('prix_entreprise'),
                prix_particulier: request.input('prix_particulier'),
                quantite: request.input('quantite'),
                description: request.input('description')
            })

            const image = request.file('image')
            if (image) {
                const newName = string.generateRandom(32) + '.' + image.extname
                await image.moveToDisk ('./', {name: newName}) 
                produit.image = newName
        }

            await produit.save()
            return response.redirect('/list-product')
    }

    async index({view}){
        const produits = await Database.from('produits').select('*').where({statut: 0}).orderBy('id', 'desc')
        return view.render('pages/list-product',{produits})
    }

    async show({view, params}){
        const id_produit = params.id
        const produit = await Database.from('produits').select('*').where({id: id_produit})
        return view.render('pages/update-product',{produit})
    }

    async update({request, response}){
        
       const produit: any = await Produit.find(request.input('id'))
       produit.name = request.input('name')
       produit.code = request.input('code')
       produit.prix_entreprise = request.input('prix_entreprise')
       produit.prix_particulier = request.input('prix_particulier')
       produit.quantite = request.input('quantite')
       produit.description = request.input('description')

       const image = request.file('image')
       if (image) {
            if (produit.image) {
                await Drive.delete(produit.image)
            }
           const newName = string.generateRandom(32) + '.' + image.extname
           await image.moveToDisk ('./', {name: newName}) 
           produit.image = newName
   }
        const produits = await Database.from('produits').select('*').orderBy('id', 'desc')
        await produit.save()
        //return view.render('pages/list-product',{produits})
        response.redirect('/list-product',{produits})
    }

    async delete({ params, response}){
        await Produit
            .query()
            .where('id', params.id)
            .update({statut: 1})
        
        response.redirect('/list-product')
    }
}
