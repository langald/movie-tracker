<template>
<div class="header">
    <div class="container">
        <div class="row">
            <ul class="col-xs-2 header__menu" >
                <li class="header__icon" @click="onHomePageClick">
                    <router-link :to="{name: 'MovieList'}" >
                        <i class="fas fa-film"></i>
                    </router-link>
                </li>
            </ul>
            <ul class="col-xs-10 text-right header__menu" >
                <li v-if="!$route.params.id">
                    <app-input
                        placeholder="Поиск.."
                        :value="searchField"
                        @onUpdateValue="onUpdateSeachMovie($event)"
                    />
                </li>
                <li @click="getFavoriteMovies">
                    <router-link :to="{name: 'MovieList'}" >
                        <div class="hidden-lg"><i class="far fa-bookmark" ></i></div>
                        <div class="visible-lg">Избранное</div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import Input from '@/components/Input'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  components: {
    'app-input': Input
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'searchField',
      'pageMode'
    ])
  },
  methods: {
    ...mapActions([
      'getMovieList',
      'getSearchMovie',
      'setCurrentPage',
      'getFavoriteMovies'
    ]),
    onUpdateSeachMovie (movieTitle) {
      if (movieTitle.trim()) {
        this.setCurrentPage(1)
        this.getSearchMovie(movieTitle)
      }
    },
    onHomePageClick () {
      if (this.pageMode !== '') {
        this.setCurrentPage(1)
        this.getMovieList()
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
 @import "@/assets/styles/settings.scss";

.header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1030;
    overflow: hidden;
    margin-bottom: 20px;
    background-color: $black-color;
    color: $gray-color;
}

.header__menu {
    padding: 0;
    margin: 0;
}
.header__menu li {
    display: inline-block;
    padding:0 10px;
    list-style-type: none;
    line-height: 80px;
    vertical-align: middle;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
}
.header__icon {
    font-size: 48px !important;
}
.header__menu a {
    color: $gray-color;
    text-decoration: none;
}
.header__menu li:hover,
.header__menu a:hover {
    color: $gray-light-color;
}

.header__menu .fa-bookmark {
    font-size: 26px;
}

</style>
