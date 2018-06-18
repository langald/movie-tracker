<template>
  <div>
    <app-loading v-show="loading" />
    <div class="container movie-wrap" v-if="!error">

      <div class="row">
        <div class="col-xs-12 text-center">
          <h1>{{movieInfo.title}}</h1>
        </div>
      </div>

      <div class="row margin-top-40">
        <div class="col-xs-12 col-sm-6 movie-image">
          <div class="image-container">
            <img :src="'https://image.tmdb.org/t/p/w780' + movieInfo.backdrop_path"  onerror="this.onerror=null;this.src='https://placeholdit.co//i/780x439?bg=000000'" />
          </div>
        </div>
        <div class="col-xs-12 col-sm-6 movie-info">
          <div class="row">
            <div class="col-xs-5 movie-info__item-name">Название:</div>
            <div class="col-xs-7">{{movieInfo.title}}</div>
          </div>

          <div class="row">
            <div class="col-xs-5 movie-info__item-name">Жанр:</div>
            <div class="col-xs-7">
              <span v-for="(genre, index) in movieInfo.genres" :key="genre.id">
                <span v-if="index">, </span>
                {{genre.name}}
              </span>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-5 movie-info__item-name">Страна:</div>
            <div class="col-xs-7">
              <span v-for="(country, index) in movieInfo.production_countries" :key="index">
                <span v-if="index">, </span>
                {{country.name}}
              </span>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-5 movie-info__item-name">Дата выхода:</div>
            <div class="col-xs-7">{{movieInfo.release_date}}</div>
          </div>

          <div class="row">
            <div class="col-xs-5 movie-info__item-name">Рейтинг:</div>
            <div class="col-xs-7">{{movieInfo.vote_average}}</div>
          </div>

          <div class="row">
            <div class="col-xs-5 movie-info__item-name">Избранное:</div>
            <div class="col-xs-7">
              <div class="movie-info__favorite" @click="setFavoriteMovies(movieInfo)">
                <i class="far fa-bookmark" v-if="!movieInfo.inFavorite"></i>
                <i class="fas fa-bookmark" v-else></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row margin-top-20">
        <div class="col-xs-12 movie-overview">
          {{movieInfo.overview}}
        </div>
      </div>

      <div class="row margin-top-20 movie-recommendations" v-if="movieRecommendations.length">
        <div class="col-xs-12">
          <h3>Смотрите также</h3>
        </div>

        <movie-poster v-for="recomendedMovie in movieRecommendations"
          :movie="recomendedMovie"
          :key="recomendedMovie.id"
          @onPosterFavoriteClick="setFavoriteMovies($event)"
        />
      </div>
    </div>
    <div v-else class="container movie-wrap text-center">
      {{error}}
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import MoviePoster from '@/components/MoviePoster'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Movie',
  components: {
    'app-loading': Loading,
    'movie-poster': MoviePoster
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'movieInfo',
      'movieRecommendations',
      'loading',
      'error'
    ])
  },
  methods: {
    ...mapActions([
      'getMovieInfo',
      'getMovieRecommendations',
      'setFavoriteMovies'
    ])
  },
  beforeRouteUpdate (to) {
    this.getMovieInfo(to.params.id)
    this.getMovieRecommendations(to.params.id)
  },
  created () {
    this.getMovieInfo(this.$route.params.id)
    this.getMovieRecommendations(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/settings.scss";

.movie-wrap {
  padding-top: 30px;
}

.movie-info {
  color: $gray-color;
  font-size: 16px;
  line-height: 2.2;
  padding-top: 30px;
}
.movie-info__item-name {
  font-weight: bold;
}
.movie-overview {
   color: $gray-dark-color;
   text-indent: 20px;
   font-size: 16px;
}

.movie-info__favorite{
  font-size: 18px;
}
.movie-info__favorite .far:hover {
  color: $gold-color;
}
.movie-info__favorite .fas {
  color: $gold-color;
}
</style>
