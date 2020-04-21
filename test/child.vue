<template>
  <div class="child">
    <div v-for="i in cols" :key="i">child-component</div>
  </div>
</template>

<script>
  /* eslint-disable */
  export default {
    name: 'child',
    props: ['cols'],
    created() {
      // console.log('child created')
    },
    mounted() {
      // console.log('child mounted')
    }
  }
</script>

<style>
  .child {
    margin: 10px;
    border: 4px solid lightblue;
    padding: 10px;
  }
</style>
