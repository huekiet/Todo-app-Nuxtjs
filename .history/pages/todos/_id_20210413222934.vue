<template>
  <form>
    <p> id page: {{this.$route.params}}</p>
    <div class="form-group">
      <input
        type="text"
        id="todoName"
        v-model="todoName"
        class="form-control" />
    </div>
    <p>todoName: {{ todoName }}</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      todoName: '',
      todoDescription: '',
      expirationDate: 0,
      priority: ''
    }
  }
}
</script>

<style scoped>

</style>
