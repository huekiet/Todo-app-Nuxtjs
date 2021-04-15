const API_URL = 'https://6075084c066e7e0017e7aa04.mockapi.io/api/v1/todos/';

export const state = () => ({
  todoList: [],
})

export const getters = {
  // allTodos(state) {
  //   return state.todoList;
  // },

  // progressingTodos(state) {
  //   return state.todoList.filters(todo => !todo.isComplete);
  // },

  // doneTodos(state) {
  //   return state.todoList.filters(todo => todo.isComplete);
  // },
  getFilterTodos: (state) => (filterComplete, filterPriority) => {
    let todos = state.todoList;

    switch (filterComplete) {
      case "progress":
        todos = todos.filter(item => !item.isComplete);
        break;
      case"done":
        todos = todos.filter(item => item.isComplete);
    }

    switch (filterPriority) {
      case "high":
        todos.filter(item => item.priority === "high"):
        break;
      case "medium":
        todos.filter(item => item.priority === "medium");
        break;
      case "low":
        todos.filter(item => item.priority === "low");
    }
  }
}

export const mutations = {
  store(state, todos) {
    state.todoList = todos;
  },

  add(state, newTodo) {
    state.todoList.push(newTodo);
  },

  edit(state, editedTodo) {
    todoInStore = state.todoList.find(todo => todo.id === editedTodo.id);
    todoInStore = editedTodo;
  },

  remove(state, removedTodo) {
    const index = state.todoList.findIndex(todo => todo.id === removedTodo.id);

    if (index >= 0) {
      state.todoList.splice(index, 1);
    } else {
      console.log('Todo id not exist:', removedTodo.id);
    }
  },

  toggleComplete(state, toggledTodo) {
    todoInStore = state.todoList.find(todo => todo.id === toggledTodo.id);
    todoInStore.isComplete = toggledTodo.isComplete;
  }
}

export const actions = {
  getTodoList({ commit }) {
    return this.$axios.$get(API_URL)
    .then(res => {
      console.log('res:', res)
      commit('store', res)});
  },

  addNewTodo({ commit }, newTodo) {
    newTodo.isComplete = false;
    requestBody = newTodo;

    return this.$axios.$post(API_URL, requestBody)
      .then(res => {
        commit('add', res);
      })
      .catch(err => {
        alert(err);
      });
  },

  editTodo({ commit }, editedTodo) {
    requestBody = editedTodo;

    return this.$axios.$put(API_URL + editedTodo.id, requestBody)
      .then(res => {
        commit('edit', res);
      })
      .catch(err => {
        alert(err);
      });
  },

  toggleCompleteTodo({ commit }, toggledTodo) {
    toggledTodo.isComplete = !toggledTodo.isComplete;
    requestBody = toggledTodo;

    return this.$axios.$put(API_URL + toggledTodo.id, requestBody)
      .then(res => {
        commit('toggleComplete', res);
      })
      .catch(err => {
        alert(err);
      });
  },

  removeTodo({ commit }, removedTodo) {
    return this.$axios.$delete(API_URL + removedTodo.id)
      .then(res => {
        commit('remove', res);
      })
      .catch(err => {
        alert(err);
      });
  }
}
