<template>
  <div>
    <div class="col-lg-2 col-md-2 col-sm-4 col-xs-6 movie-poster">
      <router-link :to="{name: 'Movie', params: { id: movie.id }}">
        <div class="image-container">
          <img :src="'https://image.tmdb.org/t/p/w185' + movie.poster_path" onerror="this.onerror=null;this.src='https://placeholdit.co//i/185x278?bg=000000'"/>
        </div>
        <div class="movie-poster__title">
          {{movie.title}}
        </div>
      </router-link>

      <div class="movie-poster__favorite" @click="onFavoriteClick(movie)">
          <i class="far fa-bookmark" v-if="!movie.inFavorite"></i>
          <i class="fas fa-bookmark" v-else></i>
      </div>

      <div class="movie-poster__genre">
        <span v-for="(genre, index) in movie.genres" :key="genre.id">
          <span v-if="index!==0">, </span>
          {{genre.name}}
        </span>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'MoviePoster',
  props: ['movie'],
  methods: {
    onFavoriteClick (movie) {
      this.$emit('onPosterFavoriteClick', movie)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/settings.scss";

.movie-poster {
  padding: 15px;
}
.movie-poster:hover {
  background-color: $gray-light-color;
}

.movie-poster__title {
  margin-top: 10px;
  line-height: 1.4em;
  height: 2.8em;
  overflow: hidden;
  float:left;
  width: calc(99% - 20px);
  color: #000;
}
.movie-poster__favorite {
  margin-top: 10px;
  float: right;
  width: 20px;
  text-align: right;
  font-size: 18px;
  cursor: pointer;
}
.movie-poster__favorite .far:hover {
  color: $gold-color;
}
.movie-poster__favorite .fas {
  color: $gold-color;
}
.movie-poster__genre {
  clear: both;
  margin-top: 55px;
  line-height: 1.4em;
  height: 2.8em;
  overflow: hidden;
  font-size: 0.8em;
  color: $gray-color;
}
.movie-poster .image-container {
  width: 165px;
  height: 248px;
}
</style>
