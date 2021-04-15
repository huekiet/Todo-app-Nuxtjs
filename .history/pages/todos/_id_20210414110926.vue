<template>
  <form>
    <p> id page: {{this.$route.params}}</p>
    <div class="form-group">
      <label for="todoName">Name:</label>
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
  layout: "todo",
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
