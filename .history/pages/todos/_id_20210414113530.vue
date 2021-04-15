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

        <div class="form-group">
          <label for="todoName" class="form-label">Description:</label>
          <input
            type="text"
            id="todoDescription"
            v-model="todoDescription"
            class="form-control form-input" />
        </div>

        <div class="form-group">
          <label for="todoName" class="form-label">Description:</label>
          <input
            type="text"
            id="todoDescription"
            v-model="todoDescription"
            class="form-control form-input" />
        </div>

        <select class="form-select">
          <option value="low" selected>Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

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
