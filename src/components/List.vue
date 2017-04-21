<template>
    <div>
        <h1>Tus recetas</h1>
        <b-nav>
            <b-button @click="newRecipe" id="new-recipe" :variant="'secondary'" href="">Nueva Receta</b-button>
        </b-nav>
        <b-table striped hover :items="recipes" :fields="fields" :current-page="currentPage" :per-page="perPage"
                 :filter="filter">
            <template slot="name" scope="item">
                {{item.value}}
            </template>
            <template slot="date" scope="item">
                {{item.value | moment}}
            </template>
            <template slot="actions" scope="item">
                <a href="" @click.prevent="editRecipe(item)"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                <a href="" @click.prevent="removeRecipe(item)"><i class="fa fa-times" aria-hidden="true"></i></a>
            </template>
        </b-table>
    </div>
</template>

<script>
  import RecipeRepository from '../model/RecipeRepository'

  const recipeRepository = new RecipeRepository()

  export default {
    data: function () {
      return {
        recipes: recipeRepository.findAll(),
        fields: {
          name: {
            label: 'Nombre',
            sortable: true
          },
          date: {
            label: 'Fecha',
            sortable: true
          },
          actions: {
            label: 'Acciones',
            sortable: false
          }
        },
        filter: null,
        currentPage: 1,
        perPage: 5
      }
    },
    methods: {
      newRecipe: function () {
        this.$router.push({name: 'new'})
      },
      editRecipe: function (item) {
        this.$router.push({name: 'edit', params: {recipeId: item.item.id}})
      },
      removeRecipe: function (item) {
        this.recipes.splice(this.recipes.indexOf(item.item), 1)
      }
    },
    watch: {
      recipes: {
        handler: function (recipes) {
          recipeRepository.saveAll(recipes)
        },
        deep: true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1, h2 {
        font-weight: normal;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
    i.fa {
        font-size: 22px !important;
        margin-right: 8px;
    }
    #new-recipe {
        margin-bottom: 10px;
    }
</style>
