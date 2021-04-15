<template>
  <div class="container page-todo">
    <div class="col-sm-7 tasks mx-auto">
      <div class="task-list">
        <h1>Tasks</h1>
        <div class="priority high"><span>high priority</span></div>
        <div
          v-for="(todo, index) in highPriorityTodos"
          :key="index"
          class="task high"
        >
          <div class="desc">
            <div class="title">{{ todo.name }}</div>
            <div>{{ todo.description }}</div>
          </div>
        </div>

        <div class="task high">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task high">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task high">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task high last">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>

        <div class="priority medium"><span>medium priority</span></div>

        <div class="task medium">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task medium last">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>

        <div class="priority low"><span>low priority</span></div>

        <div class="task low">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task low">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task low">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task low">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task low">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="task low">
          <div class="desc">
            <div class="title">Lorem Ipsum</div>
            <div>
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </div>
          </div>
          <div class="time">
            <div class="date">Jun 1, 2012</div>
            <div>1 day</div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
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

<style src="../../assets/style.css">
</style>
