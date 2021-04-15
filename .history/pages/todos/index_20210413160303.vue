<template>
  <div>
    <p> todo list</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: "all",
    };
  },
  created() {
    this.$store.dispatch('todos/getTodoList')
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
    addTodo(e) {
      // if (e.target.value.length) {
      //   this.$store.dispatch("todos/addNewTodo", e.target.value);
      //   e.target.value = "";
      // }
      this.$router.push('/todos/3')
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
      console.log('toggle todo:', todo)
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

</style>
