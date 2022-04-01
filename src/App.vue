<template>
  <div id="app">
    <HeaderWrapper @getListFilms="loadFilms"/>
    <MainWrapper
    :loadedFilmsList="loadedFilms"
    />
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
      emptyFilms:[],
    }
  },

  methods:{
    loadFilms(films){
      this.loadedFilms = films;
      console.warn("loaded");
      console.log(this.loadedFilms);
    }
  }
}
</script>

<style lang="scss">
</style>
