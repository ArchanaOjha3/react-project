import React, { useState } from "react";

const ToDoListWithFilterTask = () => {
  const [inputTask, setInputTask] = useState("");
  const [displayTask, setDisplayTask] = useState([]);
  const [filterTask, setFilterTask] = useState("all");
  const [originalTask, setOriginalTask] = useState([]);
  const [duplicatePresent, setDuplicatePresent] = useState(false);

  const addItem = () => {
    console.log('Button clicked!');
    const duplicateExist = originalTask.find(
      (item) => item.name.trim() === inputTask.trim()
    );

    if (duplicateExist) {
      setDuplicatePresent(true);
      setInputTask("");
    } else {
      setDuplicatePresent(false);
      if (inputTask.trim()) {
        const addedItem = [
          ...originalTask,
          { id: Date.now(), name: inputTask, completed: false },
        ];

        setOriginalTask(addedItem);
        setDisplayTask(addedItem);
        setInputTask("");
      }
    }
  };
  const toggleCompletion = (idx) => {
    const updateCompletion = originalTask.map((item) =>
      item.id === idx ? { ...item, completed: !item.completed } : item
    );
    setOriginalTask(updateCompletion);
    setDisplayTask(updateCompletion);
  };

  const removeTask = (idx) => {
    const removedTask = originalTask.filter((item) => item.id !== idx);
    setOriginalTask(removedTask);
    setDisplayTask(removedTask);
  };

  const filterTheTask = (value) => {
    let filteredResult;
    if (value === "completed") {
      filteredResult = originalTask.filter((item) => item.completed);
    } else if (value === "active") {
      filteredResult = originalTask.filter((item) => !item.completed);
    } else {
      filteredResult = [...originalTask];
    }
    setFilterTask(value);

    setDisplayTask(filteredResult);
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={inputTask}
          onChange={(e) => setInputTask(e.target.value)}
        ></input>
        <button onClick={() => addItem()}>Add Item</button>
      </div>

      <div>
        <select
          value={filterTask}
          onChange={(e) => filterTheTask(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>{duplicatePresent && "item already present"}</div>

      <div>
        {displayTask.map((item) => {
          return (
            <>
              <span
                // style={{
                //   textDecoration: item.completed ? "line-through" : "none",
                //   display: "flex",
                // }}
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleCompletion(item.id)}
                ></input>
                {item.name}
                <button onClick={() => removeTask(item.id)}>Delete</button>
              </span>
            </>
          );
        })}
      </div>
    </>
  );
};
export default ToDoListWithFilterTask;
