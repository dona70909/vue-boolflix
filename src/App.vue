<template>
  <div id="app">
    <HeaderWrapper @getListFilms="loadFilms"/>
    <MainWrapper
    :loadedFilms="loadedFilms"
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
    }
  },

  methods:{
    loadFilms(films){
      this.loadedFilms = films;
    }
  }
}
</script>

<style lang="scss">
</style>
