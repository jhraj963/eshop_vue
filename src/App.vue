<template>
  <div id="app">
    <div>
      <!-- Spinner Start
    <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
     Spinner End -->


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
