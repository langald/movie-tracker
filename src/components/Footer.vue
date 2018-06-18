<template>
  <div class="footer  text-center">
    <ul class="footer__menu">
      <li>Форум</li>
      <li>Контакты</li>
      <li>Помощь</li>
      <li>&#169; 2018</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/assets/styles/settings.scss";

.footer {
  height: 60px;
  margin-top: 20px;
  overflow: hidden;
  background-color: $black-color;
  color: $gray-color;
  position: relative;
  z-index: 2;
}
.footer__menu {
  padding: 15px 0;
  margin: 0;
}
.footer__menu li {
  display: inline-block;
  list-style-type: none;
  width: 20%;
  line-height: 35px;
  font-weight: bold;
  font-size: 16px;
}
.footer__menu li:not(:last-child) {
  cursor: pointer;
}
.footer__menu li:hover:not(:last-child) {
    color: $gray-light-color;
}

</style>
