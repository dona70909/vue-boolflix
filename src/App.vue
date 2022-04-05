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
    },

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
