<template>
    <div class="add-task">
      <input
        type="text"
        autocomplete="off"
        placeholder="Add New Task"
        class="task-input"
        v-model="newTask.title"
        @keyup.enter="addTask"
      />
      <textarea
        placeholder="Add Task Description"
        class="task-description"
        v-model="newTask.description"
      ></textarea>
      <label>
        <input type="checkbox" v-model="newTask.completed" />
        Completed
      </label>
      <button class="submit-task" @click="addTask">Add Task</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const newTask = ref({
    title: '',
    description: '',
    completed: false,
  });
  
  const addTask = async () => {
    if (!newTask.value.title.trim()) {
      return;
    }
  
    try {
      const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask.value),
      });
  
      if (response.ok) {
        // Handle success as needed
        newTask.value = {
          title: '',
          description: '',
          completed: false,
        };
      } else {
        console.error("Error adding new task:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding new task:", error);
    }
  };
  </script>
  
  <style scoped>
  * {
    box-sizing: border-box;
    
  }
  
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    background-color: #dedede; /* Background color */
  }
  
  .container {
    max-width: 500px;
    width: 100%;
    background-color: #ffffff; /* Container background color */
    padding: 25px;
    border-radius: 10px;
    overflow: auto;
    color: #333;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    color: #1f087c; /* Heading color */
    margin-bottom: 20px;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
  }
  
  .add-task {
    display: flex;
    flex-direction: column;
   position:relative;
   top: 50px;
  }
  
  .task-input,
  .task-description {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #19196e; /* Input border color */
    border-radius: 5px;
    outline: none;
  }
  
  .submit-task {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    background-color: #0b1d77; /* Submit button color */
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  
  .task-list {
    padding: 0;
    list-style: none;
  }
  
  .task-list-item {
    background: #fffbfb;
    border: 1px solid #000000;
    border-radius: 10px;
    margin-bottom: 10px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .task-details {
    flex: 1;
  }
  
  .task-title {
    font-weight: bold;
  }
  
  .task-actions {
    display: flex;
    align-items: center;
  }
  
  .check-btn {
    margin-right: 5px;
  }
  
  .delete-btn {
    padding: 5px;
    cursor: pointer;
    background-color: #872116; /* Delete button color */
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  
  .load-button {
    text-align: center;
    margin-top: 20px;
  }
  
  .load-btn {
    padding: 10px 20px;
    cursor: pointer;
    background-color: #555f66; /* Load button color */
    color: #fff;
    border: none;
    border-radius: 5px;
  }
  </style>
  