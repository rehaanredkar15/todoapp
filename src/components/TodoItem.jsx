import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import TodoService from '../services/todoservice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo, setSortedTodoList,todoList}) {
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const { updateTodo,deleteTodo } = TodoService();

  useEffect(() => {
    if (todo.completed === true) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const handleCheck = async () => {
    setChecked(!checked);
    try {
      const {data} = await updateTodo({completed:!checked},todo._id);
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
    } catch (error) {
      console.log("Error fetching explore items:", error);
    }
  };

  const handleDelete = async() => {
    try {
      const { data } = await deleteTodo(todo._id);
      if (data?.success) {
        setSortedTodoList((prevTodoList) => prevTodoList.filter((t) => t._id !== todo._id));
      }
    } catch (error) {
      console.log("Error deleting items:", error);
    }
    toast.success('Todo Deleted Successfully');
  };

  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };

  return (
    <>
      <div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.completed === true  && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={() => handleDelete()}
            onKeyDown={() => handleDelete()}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={() => handleUpdate()}
            onKeyDown={() => handleUpdate()}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <TodoModal
        type="update"
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
        todo={todo}
        setSortedTodoList={setSortedTodoList}
         todoList={todoList} 
      />
    </>
  );
}

export default TodoItem;
