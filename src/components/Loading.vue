<template>
  <div class="loading"></div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  background: url('../assets/loader.gif') center no-repeat;
  background-color: #fff;
  opacity: 0.7;
  z-index: 1;
}
</style>
