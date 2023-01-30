<template>
  <div id="app">
    <HeaderWrapper
    @getListFilms="loadFilms" 

    @getGenresFilms="genresFilms"
    @changedSelGenre="selMovieGenre"

    @changedSelTv="selTvGenre"
    @getGenresTv="genresTv"
    />
    <MainWrapper
    :loadedFilmsList="loadedFilms"
    :loadedTvList="loadedTv"

    :listGenresMovies="listGenresFilms"
    :selectedFilm="selectedMovieGenre"

    :listGenresTv="listGenresTv"
    :selectedTv="selectedTvGenre"
    />

    <!-- <router-view /> -->
  </div>

</template>

<script>
import HeaderWrapper from './components/header/HeaderWrapper.vue'
import MainWrapper from './components/main/MainWrapper.vue'

export default {
  name: 'App',
  components: {
    HeaderWrapper,
    MainWrapper
  },

  data(){
    return{
      loadedFilms:[],
      loadedTv:[],

      listGenresFilms:[],
      selectedMovieGenre:-1,

      listGenresTv:[],
      selectedTvGenre:-1,

    }
  },

  methods:{
    loadFilms(films,tv){
      this.loadedFilms = films;
      this.loadedTv = tv;
    },

    genresFilms(element){
      this.listGenresFilms = element;
    },

    selMovieGenre(select){
      this.selectedMovieGenre = parseInt(select);
    },

    genresTv(listGenTv){
      this.listGenresTv = listGenTv;
    },

    selTvGenre(selTv){
      this.selectedTvGenre = parseInt(selTv);
    }

  }
}
</script>

<style lang="scss">
@import '@/assets/scss/partials/_variables.scss';
html{
  background:$mainColorBg;
}
#app{
  font-family: Arial, Helvetica, sans-serif;
}
</style>
