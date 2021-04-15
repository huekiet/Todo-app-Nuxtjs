<template>
  <div class="main-content">
    <button @click.self="addNewTodo()" class="btn btn-info float-right">Add new</button>
    <h1>Tasks</h1>

    <div class="priority high"><span>high priority</span></div>
    <div v-for="todo in highPriorityTodos" :key="todo.id" class="task high">
      <div class="desc">
        <div class="title">{{ todo.name }}</div>
        <div>{{ todo.description }}</div>
      </div>
      <div class="tool">
          <NuxtLink :to="`/todos/${todo.id}`">
            <i class="fas fa-edit icon-small"></i>
          </NuxtLink>
          <i class="fa fa-times icon-small" aria-hidden="true"></i>
      </div>
    </div>

    <div class="priority medium"><span>medium priority</span></div>
    <div v-for="todo in mediumPriorityTodos" :key="todo.id" class="task medium">
      <div class="desc">
        <div class="title">{{ todo.name }}</div>
        <div>{{ todo.description }}</div>
      </div>
      <div class="tool">
        <NuxtLink :to="`/todos/${todo.id}`">Edit</NuxtLink>
      </div>
    </div>

    <div class="priority low"><span>low priority</span></div>
    <div v-for="todo in lowPriorityTodos" :key="todo.id" class="task low">
      <div class="desc">
        <div class="title">{{ todo.name }}</div>
        <div>{{ todo.description }}</div>
      </div>
      <div class="tool">
        <NuxtLink :to="`/todos/${todo.id}`">Edit</NuxtLink>
      </div>
    </div>

    <div class="clearfix"></div>
  </div>
</template>

<script>
export default {
  layout: "todo",
  data() {
    return {
      filterComplete: "allTodos",
      filterPriority: "allPriorityLevel",
    };
  },

  created() {
    this.$store.dispatch("todos/getTodoList");
  },

  computed: {
    filterTodos() {
      return this.$store.getters[`todos/getFilterTodos`](
        this.filterComplete,
        this.filterPriority
      );
    },

    highPriorityTodos() {
      return this.filterTodos.filter((todo) => todo.priority == "high");
    },

    mediumPriorityTodos() {
      return this.filterTodos.filter((todo) => todo.priority == "medium");
    },

    lowPriorityTodos() {
      return this.filterTodos.filter((todo) => todo.priority == "low");
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
    addNewTodo() {
      this.$router.push("/todos/new");
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

    filterTodosByPriority(priority) {
      switch (priority) {
        case "high":
          break;
        case "medium":
          break;
        case "low":
          break;
        default:
          return [];
      }
    },
  },
};
</script>

