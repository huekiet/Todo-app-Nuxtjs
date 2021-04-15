const API_URL = process.env.API_URL;

export const state = () => ({
    todoList: []
})

export const getters = {
    getFilterTodos: (state) => (filterComplete) => {
        let todos = state.todoList;

        switch (filterComplete) {
            case "Incomplete":
                todos = todos.filter(item => !item.isComplete);
                break;
            case "Done":
                todos = todos.filter(item => item.isComplete);
        }

        return todos;
    },

    getCurrentTodo(state) {
        return state.currentTodo;
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
        let todoInStore = state.todoList.find(todo => todo.id === editedTodo.id);
        todoInStore = editedTodo;
    },

    delete(state, deletedTodo) {
        const index = state.todoList.findIndex(todo => todo.id === deletedTodo.id);

        if (index >= 0) {
            state.todoList.splice(index, 1);
        } else {
            console.log('Todo id not exist:', deletedTodo.id);
        }
    },

    toggleComplete(state, toggledTodo) {
        let todoInStore = state.todoList.find(todo => todo.id === toggledTodo.id);
        todoInStore.isComplete = toggledTodo.isComplete;
    }
}

export const actions = {
    getTodoList({ commit }) {
        return this.$axios.$get(API_URL)
            .then(res => {
                commit('store', res)
            });
    },

    addNewTodo({ commit }, newTodo) {
        newTodo.isComplete = false;
        const requestBody = newTodo;
        console.log('newTodo:', newTodo)

        return this.$axios.$post(API_URL, requestBody)
            .then(res => {
                commit('add', res);
            })
            .catch(err => {
                alert(err);
            });
    },

    editTodo({ commit }, editedTodo) {
        const requestBody = editedTodo;

        return this.$axios.$put(API_URL + `/${editedTodo.id}`, requestBody)
            .then(res => {
                commit('edit', res);
            })
            .catch(err => {
                alert(err);
            });
    },

    toggleCompleteTodo({ commit }, toggledTodo) {
        let requestBody = {...toggledTodo };
        requestBody.isComplete = !toggledTodo.isComplete;

        return this.$axios.$put(API_URL + `/${toggledTodo.id}`, requestBody)
            .then(res => {
                commit('toggleComplete', res);
            })
            .catch(err => {
                alert(err);
            });
    },

    deleteTodo({ commit }, deletedTodo) {
        return this.$axios.$delete(API_URL + `/${deletedTodo.id}`)
            .then(res => {
                commit('delete', res);
            })
            .catch(err => {
                alert(err);
            });
    }
}