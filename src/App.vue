<template>
  <div id="app">
   <app-header/>
    <div class="main-content">
      <router-view/>
    </div>
    <app-footer/>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    'app-header': Header,
    'app-footer': Footer
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/settings.scss";

#app {
  font-family: $font-stack;
  font-size: 14px;
}
.main-content {
  margin-top: 80px;
  min-height: calc(100vh - 160px);
}

.image-container {
    width: 100%;
    height: auto;
    overflow: hidden;
    margin: 0 auto;
    padding: 0;
}

.image-container img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
}

.margin-top-10 {
  margin-top: 10px;
}
.margin-top-20 {
  margin-top: 20px;
}
.margin-top-30 {
  margin-top: 30px;
}
.margin-top-40 {
  margin-top: 40px;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-bottom-20 {
  margin-bottom: 20px;
}
.margin-bottom-30 {
  margin-bottom: 30px;
}
.margin-bottom-40 {
  margin-bottom: 40px;
}
</style>
