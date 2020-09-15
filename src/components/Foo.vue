<template>
  <div>Foo.vue
    <button @click="clickMe">点击</button>
  </div>
</template>

<script>
export default {
  methods: {
    clickMe() {
      alert('点我')
    },
  },
}
</script>

<style>

</style>