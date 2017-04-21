<template>
    <div>
        <h1>Editar receta</h1>
        <form @submit.prevent="handleSubmission">
            <div class="alert-placeholder">
                <b-alert variant="danger" :show="errors.any()">
                    Hay errores en el formulario, corrígelos antes de guardar
                </b-alert>
            </div>
            <div class="form-group" :class="{'has-danger': errors.has('name') }">
                <label class="form-control-label" for="name">Nombre</label>
                <b-form-input v-model="recipe.name" id="name" name="name" v-validate="'required'" type="text"
                              data-vv-as="nombre"
                              placeholder="Introduce el nombre de la receta" :state="'warning'"></b-form-input>
                <div v-show="errors.has('name')" class="form-control-feedback"
                     :class="{'has-danger': errors.has('name') }">{{ errors.first('name') }}
                </div>
            </div>
            <div class="form-group" :class="{'has-danger': errors.has('description') }">
                <label class="form-control-label" for="description">Descripción</label>
                <b-form-input v-model="recipe.description" id="description" name="description"
                              v-validate="'required|min:50'"
                              data-vv-as="descripción" textarea type="text"
                              placeholder="Introduce la descripción de la receta"
                              :state="'warning'"></b-form-input>
                <div v-show="errors.has('description')" class="form-control-feedback"
                     :class="{'has-danger': errors.has('description') }">{{ errors.first('description') }}
                </div>
            </div>
            <b-button type="submit" :variant="'primary'" href="">Guardar</b-button>
            <b-button type="buttom" @click.prevent="toList" :variant="'secondary'" href="">Volver</b-button>
        </form>
    </div>
</template>

<script>
  import RecipeRepository from '../model/RecipeRepository'

  const recipeRepository = new RecipeRepository()

  export default {
    props: ['recipeId'],
    data: function () {
      return {
        recipe: (this.recipeId === undefined) ? {id: recipeRepository.nextId()} : recipeRepository.findById(this.recipeId)
      }
    },
    methods: {
      handleSubmission: function () {
        this.$validator.validateAll().then(() => {
          recipeRepository.saveOne(this.recipe)
          this.$router.push({name: 'list'})
        }).catch(() => {
        })
      },
      toList: function () {
        this.$router.push({name: 'list'})
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
    .form-group {
        text-align: left;
    }
    form {
        width: 50%;
        margin: 0 auto;
    }
    textarea {
        height: 150px;
    }
    .alert-placeholder {
        height: 60px;
    }
</style>
