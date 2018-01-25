<template>
  <div id="app">
    <headers/>
    <mains/>
    <footers/>
  </div>
</template>

<script>
import Headers from './components/Header'
import Mains from './components/Main'
import Footers from './components/Footer'

export default {
  name: 'app',
  components: {
    Headers,Footers,Mains
  }
}
</script>

<style>
body{margin:0;background-color: #f1f1f1;}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 20px auto 0;
}
</style>
