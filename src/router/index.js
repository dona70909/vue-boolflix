import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeComponent from '../views/Home'
import SearchComponent from '../views/Search'

Vue.use(VueRouter)


const routes = [
    {
        path: '/',
        name: 'HomeComponent',
        component: HomeComponent
    },

    {
        path: '/search',
        name: 'SearchCompoent',
        component: SearchComponent
    },
    
    /* {
        path: '*',
        name: 'Catch all',
        beforeEnter(to, from, next) {
        next('/')
        }
    } */
]

const router = new VueRouter({
  routes
})

export default router
