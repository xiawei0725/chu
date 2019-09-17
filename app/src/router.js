import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Index from './views/Index'
import AttList from './views/AttractionsList.vue'
import Details from './views/Details.vue'
import My from './views/My.vue'
import Collection from './views/Collection.vue'
import MyAlbum from './views/MyAlbum.vue'
import Register from './views/Reg.vue'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        }, {
            path: '/login',
            name: 'login',
            // route level code-splitting this generates a separate chunk (about.[hash].js)
            // for this route which is lazy-loaded when the route is visited.
            component: () => import (/* webpackChunkName: "about" */
            './views/Login.vue')
        }, {
            path: '/index',
            name: 'index',
            // route level code-splitting this generates a separate chunk (about.[hash].js)
            // for this route which is lazy-loaded when the route is visited.
            component: Index
        }, {
            path: '/attlist',
            component: AttList
        }, {
            path: "/details",
            component: Details
        }, {
            path: "/my",
            component: My
        },{
            path: "/myAlbum",
            component: MyAlbum
        }, {
            path: "/collection",
            component: Collection
        }, {
            path: "/reg",
            component: Register
        }

    ]
})
