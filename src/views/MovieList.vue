<template>
  <div>
    <app-loading v-show="loading" />
    <div class="container movieList-wrap">
      <div class="row margin-bottom-40">
        <movie-poster v-for="movie in movieList"
          :movie="movie"
          :key="movie.id"
          @onPosterFavoriteClick="setFavoriteMovies($event)"
        />
      </div>
      <div v-if="movieList.length === 0 && !error" class="margin-top-40 text-center">
        Список пуст!
      </div>
      <div v-if="error" class="margin-top-40 text-center">
        {{error}}
      </div>
      <div class="pagination" v-show="!loading && movieList.length !== 0 && pageMode !== 'favorite'">
        <div class="pagination__nav" v-if="currentPage > 6">
          <i class="fas fa-angle-double-left" @click="onPageNumClick(1)"></i>
          <i class="fas fa-angle-left" @click="onPageNumClick(currentPage - 1)"></i>
        </div>
        <div class="pagination__page-num"
              v-for="page in totalPagesArr"
              :class="{'pagination__page-num--active': page === currentPage}"
              :key="page"
              @click="onPageNumClick(page)"
            >
          {{page}}
        </div>
        <div class="pagination__nav" v-if="totalPagesArr[9] < totalPages">
          <i class="fas fa-angle-right" @click="onPageNumClick(currentPage + 1)"></i>
          <i class="fas fa-angle-double-right" @click="onPageNumClick(totalPages)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from '@/components/Input'
import Loading from '@/components/Loading'
import MoviePoster from '@/components/MoviePoster'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Posts',
  components: {
    'app-input': Input,
    'app-loading': Loading,
    'movie-poster': MoviePoster
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'movieList',
      'genresList',
      'currentPage',
      'totalPages',
      'totalPagesArr',
      'pageMode',
      'searchField',
      'favoriteMovies',
      'loading',
      'error'
    ])
  },
  methods: {
    ...mapActions([
      'getMovieList',
      'getSearchMovie',
      'setFavoriteMovies',
      'setCurrentPage',
      'getFavoriteMovies'
    ]),
    onPageNumClick (page) {
      // console.log(page)
      this.setCurrentPage(parseInt(page))
      if (this.pageMode === '') {
        this.getMovieList()
      } else if (this.pageMode === 'search') {
        this.getSearchMovie(this.searchField)
      }
    }

  },
  created () {
    if (this.pageMode === 'favorite') {
      this.getFavoriteMovies()
    } else {
      this.getMovieList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/styles/settings.scss";

.movieList-wrap {
  padding: 15px;
}

.pagination {
  width: 100%;
  text-align: center;
}
.pagination div {
  display: inline-block;
  cursor: pointer;
}
.pagination__nav i {
  padding: 10px;
  font-size: 18px;
  color: $gray-color;
}
.pagination__page-num {
  padding: 10px;
  margin: 5px;
  border: 1px solid $gray-color;
  text-align: center;
  max-width: 50px;
}
.pagination__page-num--active,
.pagination__page-num:hover {
  background-color: $gray-light-color;
}

</style>
