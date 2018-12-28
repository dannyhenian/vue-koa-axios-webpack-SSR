import Vue from 'vue';
import Router from 'vue-router';
// import Meta from 'vue-meta'
// import cookies from 'js-cookie'

const Home = () => import('~pages/home/Home.vue');

Vue.use(Router);
// Vue.use(Meta)

export function createRouter () {
  return new Router({
    mode: 'history',
    linkActiveClass: 'active',
    linkExactActiveClass: 'exact-active',
    routes: [
      {
        path: '/',
        component: Home
      }
    ]
  });
}
