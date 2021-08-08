import React, { useState, useEffect } from "react";

//getting the data of local storage

const getDataFromLS = () => {
  const data = localStorage.getItem("items");
  if (data) {
    return JSON.parse(data);
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState();

  const [items, setItems] = useState(getDataFromLS());

  const [toggleEdit, setToggleEdit] = useState(true);

  const [isEditItems, setIsEditItems] = useState(null);

  // Add an Item to Todo List

  const addItems = () => {
    if (!inputData) {
      alert("fill the data");
    } else if (inputData && !toggleEdit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItems) return { ...elem, name: inputData };
          return elem;
        })
      );
      setToggleEdit(true);
      setInputData("");
      setIsEditItems(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, allInputData]);
      setInputData("");
    }
  };
  // Delete an Item

  const deleteItems = (index) => {
    const updatedItems = items.filter((elem, ind) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  // to remove all the Items from todoList

  const removeAll = () => {
    setItems([]);
  };

  //Saving The data to Local Storage

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  //Edit The Items of Todo List

  const editItems = (id) => {
    let newEditItems = items.find((elem) => {
      return elem.id === id;
    });
    setToggleEdit(false);
    setInputData(newEditItems.name);
    setIsEditItems(id);
  };
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <h1>Add your Todo List</h1>
          </figure>
        </div>
        <div className="AddItem">
          <input
            type="text"
            placeholder="Add your Items "
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggleEdit ? (
            <button className='btn btn-success btn-sm' onClick={addItems}>+</button>
          ) : (
            <button  className='btn btn-primary btn-sm' title="update Item" onClick={addItems}>
              +
            </button>
          )}
          <div className="showItems">
            <button className="btn btn-danger btn-sm" onClick={removeAll}>
              RemoveAll
            </button>
          </div>
        </div>
        <div className="showItems">
          {items.map((elem) => {
            return (
              <div className="each Items" key={elem.id}>
                <h1>{elem.name}</h1>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => editItems(elem.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItems(elem.id)}
                >
                  Delete
                </button>
              </div>
            );
          })}

          <div className="view-containers">
            {items.length < 1 && (
              <div> No Items has been added in local Storage</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
