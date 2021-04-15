<template>
  <div class="container">
    <div class="col-sm-9 mx-auto main-content">
      <p>todo list</p>
      <button class="btn btn-success" @click.self="addTodo()">Add new</button>
      <ul>
        <div class="priority high">
          <span>High priority</span>
        </div>
        <li v-for="todo in filterTodos" :key="todo.id">
          <div class="todo-name">{{ todo.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "allTodos",
    };
  },

  created() {
    this.$store.dispatch("todos/getTodoList");
  },

  computed: {
    filterTodos() {
      return this.$store.getters[`todos/${this.filter}`];
    },

    total() {
      return this.$store.state.todos.todoList.length;
    },

    countProgress() {
      return this.$store.state.todos.todoList.filter(function (item) {
        return !item.isComplete;
      }).length;
    },

    countDone() {
      return this.total - this.countProgress;
    },
  },

  methods: {
    addTodo() {
      // if (e.target.value.length) {
      //   this.$store.dispatch("todos/addNewTodo", e.target.value);
      //   e.target.value = "";
      // }
      this.$router.push("/todos/3");
    },

    clickEdit(todo) {
      this.isEdit = todo.id;
      this.content = todo.content;
    },

    editTodo(todo) {
      if (this.content.length) {
        this.$store.dispatch("todos/editTodo", { todo, content: this.content });
        this.isEdit = -1;
        this.content = "";
      }
    },

    toggle(todo) {
      console.log("toggle todo:", todo);
      this.$store.dispatch("todos/toggleTodo", todo);
    },

    deleteTodo(todo) {
      this.$store.dispatch("todos/deleteTodo", todo);
    },

    clickAll() {
      this.filter = "all";
    },

    clickProgress() {
      this.filter = "progress";
    },

    clickDone() {
      this.filter = "done";
    },
  },
};
</script>

<style scoped>
.main-content {
  border: 1.5px solid rgb(122, 113, 113);
  margin-top: 50px;
  height: 500px;
  overflow: auto;
}
.todo-name {
  font-size: 18px;
  margin-bottom: 5px;
}
.priority.high {
  background: #f5bcbc;
  margin-bottom: 1px
}
.priority.high span {
  background: #f86c6b;
  padding: 2px 10px;
  color: #fff;
  display: inline-block;
  font-size: 14px
}
</style>
