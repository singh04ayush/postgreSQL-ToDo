import React, { Fragment, useState } from 'react';

const InputTodos = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    try {
      e.preventDefault();
      const body = { description };
      await fetch("http://localhost:4000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = '/';
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Task Master</h1>
      <form onSubmit={onSubmitForm} className="d-flex mt-5">
        <input 
          type="text" 
          className="form-control" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
          placeholder="What needs to be done?"
        />
        <button className="btn btn-success ml-2">
          <i className="fas fa-plus"></i> ADD
        </button>
      </form>
    </Fragment>
  );
}

export default InputTodos;
