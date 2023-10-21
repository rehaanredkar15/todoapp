/* eslint-disable react/prop-types */
import styles from '../styles/modules/app.module.scss';
import TodoItem from './TodoItem';
import { useEffect, useState } from 'react';
import TodoService from '../services/todoservice';


function AppContent({sortedTodoList , setSortedTodoList}) {
  const { getAllTodos } = TodoService();

  const fetchTodos = async () => {
    try {
      const {data} = await getAllTodos();
      if (data?.success) {
        setSortedTodoList(data?.todos);
      }
    } catch (error) {
      console.log("Error fetching explore items:", error);
    }
  };

    useEffect(() => {
      fetchTodos();
    }, []);


    const filteredTodoList = sortedTodoList.filter((item) => {
      return true;
  });
  
  
  return (
    <div
      className={styles.content__wrapper}
    >
        {filteredTodoList && filteredTodoList.length > 0 ? (
          filteredTodoList.map((todo) => (
            <TodoItem key={todo._id} todo={todo}  setSortedTodoList={setSortedTodoList} todoList={sortedTodoList} />
          ))
        ) : (
          <p  className={styles.emptyText}>
            No Todos
          </p>
        )}
    </div>
  );
}

export default AppContent;
