<template>
  <div class="main-content">
    <button @click.self="addNewTodo()" class="btn btn-info float-right">
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
            @click.self="toggle(todo)"
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
      filterComplete: "allTodos",
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

    total() {
      return this.$store.state.todos.todoList.length;
    },

    countProgress() {
      return this.$store.state.todos.todoList.filter(function(item) {
        return !item.isComplete;
      }).length;
    },

    countDone() {
      return this.total - this.countProgress;
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

    toggle(todo) {
      this.$store.dispatch("todos/toggleCompleteTodo", todo);
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

    openDeleteConfirmation(todo) {
      showMsgBoxTwo() {
        this.$bvModal.msgBoxConfirm('Please confirm that you want to delete everything.', {
          title: 'Delete selected todo?',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if (value) {
              this.deleteTodo(todo);
            }
          })
          .catch(err => {
            // An error occurred
          })
      }
    }
  }
};
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
