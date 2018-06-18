import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

axios.defaults.baseURL = 'https://api.themoviedb.org/3'
const API_KEY = '2144a8c08ed58c5ef00c504fbd2cbddc'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    movieList: [],
    genresList: {},
    currentPage: 1,
    totalPages: null,
    pageMode: '',
    searchField: '',
    favoriteMovies: JSON.parse(localStorage.getItem('favoriteMovies')) || [],
    movieInfo: {},
    movieRecommendations: [],
    loading: false,
    error: ''
  },
  getters: {
    movieList (state) {
      return state.movieList
    },
    genresList (state) {
      return state.genresList
    },
    currentPage (state) {
      return state.currentPage
    },
    totalPages (state) {
      return state.totalPages
    },
    totalPagesArr (state) {
      let start = state.currentPage - 5 > 1 ? state.currentPage - 5 : 1
      return [...Array(state.totalPages).keys()].map(e => e + 1).slice(start - 1, start + 9)
    },
    pageMode (state) {
      return state.pageMode
    },
    searchField (state) {
      return state.searchField
    },
    favoriteMovies (state) {
      return state.favoriteMovies
    },
    movieInfo (state) {
      return state.movieInfo
    },
    movieRecommendations (state) {
      return state.movieRecommendations.slice(0, 6)
    },

    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  },
  mutations: {
    getMovieList (state, data) {
      data.forEach(movie => {
        movie.genres = movie.genre_ids.map(genreId => {
          return {
            id: genreId,
            name: state.genresList[genreId]
          }
        })

        movie.inFavorite = state.favoriteMovies.some(fm => {
          return fm.id === movie.id
        })
      })
      state.movieList = data
    },
    getGenresList (state, data) {
      let genresObj = {}
      data.forEach(genre => {
        Object.assign(genresObj, {[genre.id]: genre.name})
      })
      // console.log(JSON.stringify(genresObj))
      state.genresList = genresObj
    },
    setTotalPages (state, data) {
      state.totalPages = data
    },
    setCurrentPage (state, data) {
      state.currentPage = data
    },
    setPageMode (state, data) {
      state.pageMode = data
    },
    setSearchField (state, data) {
      state.searchField = data
    },
    setFavoriteMovies (state, movie) {
      let inFavorite = state.favoriteMovies.some(fm => {
        return fm.id === movie.id
      })

      if (inFavorite) {
        state.favoriteMovies = state.favoriteMovies.filter(item => {
          return item.id !== movie.id
        })
      } else {
        state.favoriteMovies.push(movie)
      }
      state.movieList.forEach(item => {
        if (item.id === movie.id) {
          item.inFavorite = !item.inFavorite
        }
      })
      state.movieRecommendations.forEach(item => {
        if (item.id === movie.id) {
          item.inFavorite = !item.inFavorite
        }
      })
      state.movieInfo.inFavorite = !state.movieInfo.inFavorite
      localStorage.setItem('favoriteMovies', JSON.stringify(state.favoriteMovies))
    },
    getFavoriteMovies (state) {
      state.movieList = JSON.parse(localStorage.getItem('favoriteMovies')) || []
    },
    getMovieInfo (state, data) {
      data.inFavorite = state.favoriteMovies.some(fm => {
        return fm.id === data.id
      })
      state.movieInfo = data
    },
    getMovieRecommendations (state, data) {
      data.forEach(movie => {
        movie.genres = movie.genre_ids.map(genreId => {
          return {
            id: genreId,
            name: state.genresList[genreId]
          }
        })

        movie.inFavorite = state.favoriteMovies.some(fm => {
          return fm.id === movie.id
        })
      })
      state.movieRecommendations = data
    },
    loadingOn (state) {
      state.loading = true
    },
    loadingOff (state) {
      state.loading = false
    },
    setError (state, data) {
      state.error = data
    }
  },
  actions: {
    getMovieList (store, payload) {
      store.commit('loadingOn')
      store.commit('setError', '')
      store.commit('setSearchField', '')
      axios.get('/genre/movie/list?api_key=' + API_KEY + '&language=ru')
        .then(function (response) {
          // console.log(JSON.stringify(response.data.genres))
          store.commit('getGenresList', response.data.genres)
          axios.get('/movie/popular?api_key=' + API_KEY + '&language=ru&page=' + store.state.currentPage)
            .then(function (response) {
              // console.log(JSON.stringify(response.data.results))
              store.commit('getMovieList', response.data.results)
              store.commit('setTotalPages', response.data.total_pages)
              store.commit('setPageMode', '')
              store.commit('loadingOff')
            })
        })
        .catch(function (error) {
          console.log(error)
          store.commit('setError', error.message)
          store.commit('loadingOff')
        })
    },
    getSearchMovie (store, movieTitle) {
      store.commit('loadingOn')
      store.commit('setError', '')
      store.commit('setSearchField', movieTitle)
      axios.get('/search/movie?api_key=' + API_KEY + '&language=ru&page=' + store.state.currentPage + '&query=' + movieTitle)
        .then(function (response) {
          // console.log(JSON.stringify(response.data.results))
          store.commit('getMovieList', response.data.results)
          store.commit('setTotalPages', response.data.total_pages)
          store.commit('setPageMode', 'search')
          store.commit('loadingOff')
        })
        .catch(function (error) {
          console.log(error)
          store.commit('setError', error.message)
          store.commit('loadingOff')
        })
    },
    setFavoriteMovies (store, movie) {
      store.commit('setFavoriteMovies', movie)
    },
    getFavoriteMovies (store) {
      store.commit('setError', '')
      store.commit('setSearchField', '')
      store.commit('setPageMode', 'favorite')
      store.commit('getFavoriteMovies')
    },
    setCurrentPage (store, payload) {
      store.commit('setCurrentPage', payload)
    },

    getMovieInfo (store, movieId) {
      store.commit('loadingOn')
      store.commit('setError', '')
      axios.get('/movie/' + movieId + '?api_key=' + API_KEY + '&language=ru')
        .then(function (response) {
          // console.log(JSON.stringify(response.data))
          store.commit('getMovieInfo', response.data)
          store.commit('loadingOff')
        })
        .catch(function (error) {
          console.log(error)
          store.commit('setError', error.message)
          store.commit('loadingOff')
        })
    },
    getMovieRecommendations (store, movieId) {
      store.commit('loadingOn')
      store.commit('setError', '')
      axios.get('/genre/movie/list?api_key=' + API_KEY + '&language=ru')
        .then(function (response) {
          // console.log(JSON.stringify(response.data.genres))
          store.commit('getGenresList', response.data.genres)

          axios.get('/movie/' + movieId + '/recommendations?api_key=' + API_KEY + '&language=ru')
            .then(function (response) {
              // console.log('action getMovieRecommendations ' + JSON.stringify(response.data.results))
              store.commit('getMovieRecommendations', response.data.results)
              store.commit('loadingOff')
            })
        })

        .catch(function (error) {
          console.log(error)
          store.commit('setError', error.message)
          store.commit('loadingOff')
        })
    }
  },
  strict: process.env.NODE_ENV !== 'production'
})
