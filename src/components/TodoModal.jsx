/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdOutlineClose } from 'react-icons/md';
import TodoService from '../services/todoservice';
import styles from '../styles/modules/modal.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo , setSortedTodoList, todoList }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const { createTodo,updateTodo } = TodoService();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
    } else {
      setTitle('');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (title) {
      if (type === 'add') {
        try {
          const {data} = await createTodo({title});
          if (data?.success) {
            setSortedTodoList((prevTodos) => [...prevTodos, data?.savedTodo]);

          }
          toast.success('Todo added successfully');
        } catch (error) {
          console.log("Error Adding todo:", error);
        }
      }
      if (type === 'update') {
        if (todo.title !== title) {
          try {
            const {data} = await updateTodo({title},todo._id);
            if (data?.success) {
              const updatedTodoList = todoList.map((todo) => {
                if (todo._id === data.updatedTodo._id) {
                  return data.updatedTodo;
                } else {
                  return todo;
                }
              });
              setSortedTodoList(updatedTodoList);
            }
            toast.success('Todo added successfully');
          } catch (error) {
            console.log("Error fetching explore items:", error);
          }
          toast.success('Todo Updated successfully');
        } else {
          toast.error('No changes made');
          return;
        }
      }
      setModalOpen(false);
    }
  };

  return (
    <>
      {modalOpen && (
        
        <div
          className={styles.wrapper}
        >
          <div
            className={styles.container}
          >
            <div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
            >
              <MdOutlineClose />
            </div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  placeholder='Enter the Task...'
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Todo' : 'Update Todo'}
                </Button>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoModal;
