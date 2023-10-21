import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import AppContent from './components/AppContent.jsx';
import AppHeader from './components/AppHeader.jsx';
import PageTitle from './components/PageTitle.jsx';
import styles from './styles/modules/app.module.scss';

function App() {
  const [sortedTodoList, setSortedTodoList] = useState([])

  return (
    <>
      <div className="container">
        <PageTitle>Organize your Day</PageTitle>
        <div className={styles.app__wrapper}>
          <AppHeader  sortedTodoList={sortedTodoList}  setSortedTodoList={setSortedTodoList}/>
          <AppContent  sortedTodoList={sortedTodoList} setSortedTodoList={setSortedTodoList}/>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
