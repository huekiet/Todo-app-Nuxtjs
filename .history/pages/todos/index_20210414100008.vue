<template>
  <div class="container">
    <div class="col-sm-9">
      <p>todo list</p>
      <button class="btn btn-success" @click.self="addTodo()">Add new</button>

      <div class="priority high">
        <span>High priority</span>
      </div>
      <ul>
        <li v-for="todo in highPriorityTodos" :key="todo.id" class="todo-item priority high">
          <div class="todo-name">{{ todo.name }}</div>
          <div class="todo-description">{{ todo.description }}</div>
        </li>
      </ul>

      <div class="priority medium">
        <span>Medium priority</span>
      </div>
      <ul>
        <li v-for="todo in mediumPriorityTodos" :key="todo.id">
          <div class="todo-name">{{ todo.name }}</div>
          <div class="todo-description">{{ todo.description }}</div>
        </li>
      </ul>

      <div class="priority low">
        <span>Low priority</span>
      </div>
      <ul>
        <li v-for="todo in lowPriorityTodos" :key="todo.id">
          <div class="todo-name">{{ todo.name }}</div>
          <div class="todo-description">{{ todo.description }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
    // filterTodos() {
    //   return this.$store.getters[`todos/${this.filterComplete}`];
    // },

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
  margin-bottom: 1px;
}

.priority.high span {
  background: #f86c6b;
  padding: 2px 10px;
  color: #fff;
  display: inline-block;
  font-size: 14px;
}

.priority.medium {
  background: #fff0ab;
  margin-bottom: 1px;
}

.priority.medium span {
  background: #f8cb00;
  padding: 2px 10px;
  color: #fff;
  display: inline-block;
  font-size: 14px;
}

.priority.low {
  background: #cfedda;
  margin-bottom: 1px;
}

.priority.low span {
  background: #4dbd74;
  padding: 2px 10px;
  color: #fff;
  display: inline-block;
  font-size: 14px;
}

li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.todo-item.priority.high {
  border-left: 1px solid red;
}
</style>
