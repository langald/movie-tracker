import Vue from 'vue'
import Router from 'vue-router'
import MovieList from '@/views/MovieList'
import Movie from '@/views/Movie'
import E404 from '@/views/E404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MovieList',
      component: MovieList
    },
    {
      path: '/:id',
      name: 'Movie',
      component: Movie
    },
    {
      path: '*',
      component: E404
    }
  ],
  mode: 'history'
})
