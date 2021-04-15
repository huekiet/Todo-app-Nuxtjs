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
            v-model="currentTodo.name"
            class="form-control form-input"
          />
        </div>

        <div class="form-group">
          <label for="todoName" class="form-label">Description:</label>
          <input
            type="text"
            id="todoDescription"
            v-model="currentTodo.description"
            class="form-control form-input"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Select priority</label>
          <select
            class="custom-select form-input"
            v-model="currentTodo.priority"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div class="custom-control custom-checkbox" v-if="showCompleteCheckbox()">
          <input
            type="checkbox"
            class="custom-control-input"
            v-model="currentTodo.isComplete"
            id="isComplete"
          />
          <label class="custom-control-label form-check-label" for="isComplete">
            Complete
          </label>
        </div>
      </form>

      <div class="footer">
        <button @click.self="goBack()" class="btn btn-secondary btn-sm">Back</button>
        <button @click.self="saveTodo()" class="btn btn-success btn-sm">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "todo",

  created() {
    console.log("currentTodo in created():", this.currentTodo);
  },

  async asyncData({ params, $axios, redirect, env }) {
    const todoId = params.id;
    console.log('process:', process)
    if (todoId != "new") {
      try {
        let currentTodo = await $axios.$get(
          `${env.API_URL}/${todoId}`
        );
        return { currentTodo };
      } catch (err) {
        redirect("/todos/new");
      }
    } else {
      return {
        currentTodo: {
          id: "",
          priority: "",
          name: "",
          description: "",
          isComplete: false
        }
      };
    }
  },

  methods: {
    async saveTodo() {
      if (
        this.currentTodo.priority === "" ||
        this.currentTodo.name === "" ||
        this.currentTodo.description ==="")
        {
          alert('Fill in form please!');
          return;
        }

      if (this.$route.params.id != "new") {
        await this.$store.dispatch("todos/editTodo", this.currentTodo);
      } else {
        await this.$store.dispatch("todos/addNewTodo", this.currentTodo);
      }
      this.$router.push("/todos");
    },

    showCompleteCheckbox() {
      return !(this.$route.params.id === "new");
    },

    goBack() {
      this.$router.push("/todos");
    }
  }
};
</script>

<style scoped></style>
