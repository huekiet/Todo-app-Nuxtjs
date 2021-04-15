<template>
  <div class="main-content">
    <button @click.self="addNewTodo()" class="btn btn-info float-right">Add new</button>
    <h1>Tasks</h1>

    <div
      v-for="(priority, index) in priorityList"
      :key="index"
      >
      <div class="priority" :class="priority">
        <span>{{ priority }} priority</span>
      </div>
      <div v-for="todo in filterTodosByPriority(priority)" :key="todo.id" class="task" :class="priority">
        <div class="desc">
          <div class="title">{{ todo.name }}</div>
          <div>{{ todo.description }}</div>
        </div>
        <div class="tool">
            <div>
              <span>
                <i @click.self="deleteTodo(todo)" class="fa fa-times icon-small text-danger ml-0 pl-0 pr-1" aria-hidden="true"></i>
              </span>
            </div>
            <NuxtLink :to="`/todos/${todo.id}`">
              <i class="fas fa-edit icon-small"></i>
            </NuxtLink>
        </div>
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
      priorityList: ["low", "medium", "high"]
    };
  },

  created() {
    this.$store.dispatch("todos/getTodoList");
  },

  computed: {
    filterTodos() {
      return this.$store.getters[`todos/getFilterTodos`](
        this.filterComplete
      );
    },

    // highPriorityTodos() {
    //   return this.filterTodos.filter((todo) => todo.priority == "high");
    // },

    // mediumPriorityTodos() {
    //   return this.filterTodos.filter((todo) => todo.priority == "medium");
    // },

    // lowPriorityTodos() {
    //   return this.filterTodos.filter((todo) => todo.priority == "low");
    // },

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
    filterTodosByPriority(targetPriority) {
      return this.filterTodos.filter(todo => todo.priority === targetPriority);
    },

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
      this.$store.dispatch("todos/removeTodo", todo);
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

