import React, { useState } from "react";

function App() {
  // getting all notes from local storage
  let items = localStorage.getItem("items");
  console.log(items);
  items = JSON.parse(items);
  // check not exist or note
  const isPresent = () => {
    if (items === null) {
      return false;
    } else {
      return true;
    }
  };
  // input state
  const [inputText, setInputText] = useState("");
  // handing state
  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }
  // adding note to the local strorage
  function addItem() {
    if (localStorage.getItem("items") === null) {
      let items = [];
      items.push(inputText);
      localStorage.setItem("items", JSON.stringify(items));
    } else {
      let tempItems = localStorage.getItem("items");
      let items = JSON.parse(tempItems);
      items.push(inputText);
      let setItems = JSON.stringify(items);
      localStorage.setItem("items", setItems);
      setInputText("");
    }
  }

  // for deletion of item of todolist
  const deleteItem = (id) => {
    let getAllItems = localStorage.getItem("items");
    getAllItems = JSON.parse(getAllItems);
    console.log(getAllItems);
    let filteredItem = getAllItems.filter((item, index) => {
      return index !== id;
    });
    localStorage.setItem("items", JSON.stringify(filteredItem));
    if (inputText === "note deleted") {
      setInputText("");
    } else {
      setInputText("note deleted");
    }
  };

  const refreshField = () => {
    setInputText("");
  };

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          onFocus={refreshField}
          type="text"
          value={inputText}
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {isPresent() ? (
            items.map((item, index) => (
              <li onClick={() => deleteItem(index)}>{item}</li>
            ))
          ) : (
            <li>Add your note to delete click on note</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
