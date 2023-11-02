import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import TypeProduit from './TypeProduit'

export default class Produit extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public code: string

  @column()
  public prix_entreprise: string

  @column()
  public prix_particulier: string

  @column()
  public quantite: string

  @column()
  public image: string

  @column()
  public description: string | null

  @column()
  public statut: Number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime 

  @hasMany(() => TypeProduit)
  public typeProduit: HasMany<typeof TypeProduit>
}
