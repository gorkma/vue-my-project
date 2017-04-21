import uuid from 'uuid/v4'
import moment from 'moment'
moment.locale('es')

const STORAGE_KEY = 'recipes'

export default class RecipeRepository {

  nextId () {
    return uuid()
  }

  findAll () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  }

  findById (id) {
    return this.findAll().find(recipe => id === recipe.id)
  }

  saveOne (recipe) {
    let recipes = this.findAll()
    if (this.findById(recipe.id) === undefined) {
      recipe.date = moment()
      recipes.push(recipe)
    } else {
      const index = recipes.findIndex(value => value.id === recipe.id)
      recipes[index] = recipe
    }

    this.saveAll(recipes)
  }

  saveAll (recipes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }
}
