import React, { Fragment } from 'react';
import './index.css';
import ListTodos from './components/ListTodos';
import InputTodos from './components/InputTodos';

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodos />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
