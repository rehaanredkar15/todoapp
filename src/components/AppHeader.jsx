import React, { useState } from 'react';
import styles from '../styles/modules/app.module.scss';
import Button from './Button';
import TodoModal from './TodoModal';

function AppHeader({sortedTodoList , setSortedTodoList}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Todo
      </Button>
     
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} setSortedTodoList={setSortedTodoList} todoList={sortedTodoList} />
    </div>
  );
}

export default AppHeader;
