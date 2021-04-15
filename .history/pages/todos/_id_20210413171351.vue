<template>
  <div>
    <p> id page: {{this.$route.params}}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todoDescription: '',
      expirationDate: 0,
      priority: ''
    }
  }
}
</script>

<style scoped>

</style>
