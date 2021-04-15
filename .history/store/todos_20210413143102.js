const API_URL = '';

export const state = () => ({
  todoList: [],
})

export const getters = {
  allTodos(state) {
    return state.todoList;
  },

  progressingTodos(state) {
    return state.todoList.filters(todo => !todo.isComplete);
  },

  doneTodos(state) {
    return state.todoList.filters(todo => todo.isComplete);
  }
}

export const mutation = {
  storeTodos(state, todos) {
    state.todoList = todos;
  },

  addNewTodo(state, newTodo) {
    state.todoList.push(newTodo);
  },

  editTodo(state, editedTodo) {
    todoInStore = state.todoList.find(todo => todo.id === editedTodo.id);
    todoInStore = editedTodo;
  },

  removeTodo(state, removedTodo) {
    const index = state.todoList.findIndex(todo => todo.id === removedTodo.id);

    if (index >= 0) {
      state.todoList.splice(index, 1);
    }
  },

  toggleCompleteTodo(state, toggledTodo) {

  }
}
