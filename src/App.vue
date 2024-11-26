<template>
  <div id="app">
    <div>


      <Header></Header>
      <!-- load all other page/component -->
      <router-view />

      <Footer></Footer>
    </div>

  </div>
</template>

<script>
import Header from './components/Include/Header.vue'
import Footer from './components/Include/Footer.vue'

export default {
  name: 'App',
  components: {
    Header, Footer
  }
}
</script>
