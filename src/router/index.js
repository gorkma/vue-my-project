import Vue from 'vue'
import Router from 'vue-router'
import List from '@/components/List'
import Edit from '@/components/Edit'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'list',
      component: List,
      props: true,
      meta: {
        title: 'Tus recetas'
      }
    },
    {
      path: '/recipe/:recipeId',
      name: 'edit',
      component: Edit,
      props: true,
      meta: {
        title: 'Editar receta'
      }
    },
    {
      path: '/recipe',
      name: 'new',
      component: Edit,
      meta: {
        title: 'Nueva receta'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
