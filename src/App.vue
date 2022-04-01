<template>
  <div id="app">
    <HeaderWrapper/>
    <MainWrapper/>
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
  }
}
</script>

<style lang="scss">
</style>
