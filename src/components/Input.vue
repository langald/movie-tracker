<template>
    <div>
        <input type="text"
                :value="value"
                :placeholder="placeholder"
                @input="onInput"
        >
    </div>
</template>

<script>
export default {
  name: 'Input',
  props: ['placeholder', 'value'],
  methods: {
    onInput (e) {
      this.$emit('onUpdateValue', e.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
 @import "@/assets/styles/settings.scss";

 input {
    border-radius: 0;
    font-weight: normal;
    height: 34px;
    padding: 5px;
    color: #000;
    border: 1px solid #ccc;
 }

 input:focus {
    box-shadow: none;
    border: 1px solid #ccc;
    outline: none;
    outline-offset: 0;
 }

</style>
