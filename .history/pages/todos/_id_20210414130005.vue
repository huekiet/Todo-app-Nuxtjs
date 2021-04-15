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
            v-model="todo.name"
            class="form-control form-input"
          />
        </div>
        <p> model: {{todo.name}}</p>

        <div class="form-group">
          <label for="todoName" class="form-label">Description:</label>
          <input
            type="text"
            id="todoDescription"
            v-model="todoDescription"
            class="form-control form-input"
          />
        </div>

        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label class="form-check-label" for="flexCheckDefault">
            Default checkbox
          </label>
        </div>

        <select class="form-select">
          <option value="low" selected>Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </form>

      <div class="footer">
        <button class="btn btn-secondary">Back</button>
        <button @click.self="saveTodo" class="btn btn-success">Save</button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  layout: "todo",
  data() {
    return {
      todo: {
        id: '',
        name: "",
        description: "",
        priority: "",
        isComplete: false,
      }
    };
  },

  method: {
    saveTodo() {

    }
  }
};
</script>

<style scoped>
</style>
