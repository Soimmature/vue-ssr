<template>
  <div>Foo.vue
    <button @click="clickMe">点击</button>
  </div>
</template>

<script>
export default {
  // 只在服务端执行， 并且只在页面组件执行
  asyncData(store) {
    console.log('server')
    return store.dispatch('changeName')
  },
  methods: {
    clickMe() {
      alert('点我')
    },
  },
}
</script>

<style>

</style>