<template>
  <div id="app">
    <HeaderWrapper @getListFilms="loadFilms"/>
    <MainWrapper
    :loadedFilmsList="loadedFilms"
    :loadedTvList="loadedTv"
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
      loadedTv:[],
    }
  },

  methods:{
    loadFilms(films,tv){
      this.loadedFilms = films;
      this.loadedTv = tv;
      console.warn("loaded");
      console.log(this.loadedFilms);
      console.log("tv")
      console.log(this.loadedTv);
    },

  }
}
</script>

<style lang="scss">
html{
  background: rgb(43, 40, 40);
}

</style>
