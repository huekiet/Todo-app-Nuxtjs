<template>
  <div class="main-content">
    <button @click.self="addNewTodo()" class="btn btn-info float-right btn-sm">
      Add new
    </button>
    <h1>Tasks</h1>
    <p class="font-italic note">(click name of a todo to toggle complete)</p>

    <div v-for="(priority, index) in priorityList" :key="index">
      <div class="priority" :class="priority">
        <span>{{ priority }} priority</span>
      </div>

      <div
        v-for="todo in filterTodosByPriority(priority)"
        :key="todo.id"
        class="task"
        :class="priority"
      >
        <div class="desc">
          <div
            class="title"
            @click.self="toggleComplete(todo)"
            :class="{ done: todo.isComplete }"
          >
            {{ todo.name }}
          </div>
          <div>
            {{ todo.description }}
          </div>
        </div>

        <div class="tool">
          <div>
            <span>
              <i
                @click.self="openDeleteConfirmation(todo)"
                class="fa fa-times icon-small text-danger ml-0 pl-0 pr-1"
                aria-hidden="true"
              ></i>
            </span>
          </div>
          <NuxtLink :to="`/todos/${todo.id}`">
            <i class="fas fa-edit icon-small"></i>
          </NuxtLink>
        </div>
      </div>
    </div>

    <div class="filter-button-group mt-1 text-center">
      <button
        @click.self="clickDone()"
        class="btn btn-sm btn-outline-warning"
        :class="{ active: filterComplete === 'Done' }"
      >
        Done({{ countDoneTodos }})
      </button>
      <button
        @click.self="clickIncompleted()"
        class="btn btn-sm btn-outline-danger"
        :class="{ active: filterComplete === 'Incompleted' }"
      >
        Incompleted({{ countIncompletedTodos }})
      </button>
      <button
        @click.self="clickAll()"
        class="btn btn-sm btn-outline-info"
        :class="{ active: filterComplete === 'All' }"
      >
        All({{ countTotalTodos }})
      </button>
    </div>
    <Loading v-if="isLoading" />

    <div class="clearfix"></div>
  </div>
</template>

<script>
import Loading from "~/components/loader";
export default {
  layout: "todo",
  components: {
    Loading
  },
  data() {
    return {
      filterComplete: "All",
      priorityList: ["high", "medium", "low"],
      isLoading: false
    };
  },

  async created() {
    this.isLoading = true;
    await this.$store.dispatch("todos/getTodoList");
    this.isLoading = false;
  },

  computed: {
    filterTodos() {
      return this.$store.getters[`todos/getFilterTodos`](this.filterComplete);
    },

    countTotalTodos() {
      return this.$store.state.todos.todoList.length;
    },

    countIncompletedTodos() {
      return this.$store.state.todos.todoList.filter(function(item) {
        return !item.isComplete;
      }).length;
    },

    countDoneTodos() {
      return this.countTotalTodos - this.countIncompletedTodos;
    }
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

    toggleComplete(todo) {
      this.$store.dispatch("todos/toggleCompleteTodo", todo);
    },

    async deleteTodo(todo) {
      this.isLoading = true;
      await this.$store.dispatch("todos/deleteTodo", todo);
      this.isLoading = false;
    },

    clickAll() {
      this.filterComplete = "All";
    },

    clickIncompleted() {
      this.filterComplete = "Incompleted";
    },

    clickDone() {
      this.filterComplete = "Done";
    },

    openDeleteConfirmation(todo) {
      this.$bvModal
        .msgBoxConfirm("Please confirm that you want to delete this todo.", {
          title: "Delete selected todo?",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          okTitle: "YES",
          cancelTitle: "NO",
          footerClass: "p-1",
          dialogClass: "confirm-content",
          titleClass: "confirm-title",
          hideHeaderClose: false,
          centered: true
        })
        .then(value => {
          if (value) {
            this.deleteTodo(todo);
          }
        })
        .catch(err => {});
    }
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
