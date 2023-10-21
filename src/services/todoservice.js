import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5500/v1/',
    responseType: "json"
});

api.defaults.timeout = 1555500;

const TodoService = () => {
    
  const createTodo = async (todo) => {
    try {
        const response = await api.post("todos/addTodo", todo);
        return response;
      } catch (e) {
        console.debug(e);
      }
  };

  const getAllTodos = async () => {
    try {
        const response = await api.get("todos/getTodos");
        return response;
      } catch (e) {
        console.debug(e);
      }
  }

  const updateTodo = async (todo, todoId) => {
    try {
        const response = await api.put("todos/updateTodo/" + todoId, todo);
        return response;
      } catch (e) {
        console.debug(e);
      }
  }

  const deleteTodo = async (todoId) => {
    try {
        const response = await api.delete("todos/deleteTodo/" + todoId);
        return response;
      } catch (e) {
        console.debug(e);
      }
  }

  return { createTodo, getAllTodos, updateTodo, deleteTodo };
};

export default TodoService;