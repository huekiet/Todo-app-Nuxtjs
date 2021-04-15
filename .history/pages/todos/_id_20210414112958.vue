<template>
  <div class="main-content">
    <h1>Edit</h1>
    <div class="task">
      <form>
        <div class="form-group">
          <label for="todoName" class="form-label">Name:</label>
          <input
            type="text"
            id="todoName"
            v-model="todoName"
            class="form-control form-input" />
        </div>
        <p>todoName: {{ todoName }}</p>
      </form>
    </div>
  </div>
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
