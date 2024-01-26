<template>
  <div class="container">
    <h1>{{ title }}</h1>
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
    <ul class="task-list">
      <li class="task-list-item" v-for="task in tasks" :key="task.id">
        <div class="task-details">
          <span class="task-title">{{ task.title }}</span>
          <p class="task-description">{{ task.description }}</p>
        </div>
        <div class="task-actions">
          <input
          type="checkbox"
          v-model="task.completed"
          class="check-btn"
          @change="updateTask(task)"
        />         
         <button @click="delItem(task)" class="delete-btn">Delete</button>
        </div>
      </li>
    </ul>
    <div class="load-button">
      <button @click="loadTasks()" class="load-btn">Load Tasks</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('To-Do List');
const newTask = ref({
  title: '',
  description: '',
  completed: false,
});
const tasks = ref([]);

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
      const data = await response.json();
      tasks.value.unshift(data);
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

const delItem = async (task) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      tasks.value = tasks.value.filter((t) => t.id !== task.id);
    } else {
      console.error("Error deleting task:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const loadTasks = () => {
  fetch('http://127.0.0.1:8000/api/tasks/')
    .then((res) => res.json())
    .then((data) => {
      tasks.value = data;
    });
};

const  updateTask = async (task) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task), // Envoyer la tâche complète, y compris la propriété "completed"
    });

    if (!response.ok) {
      console.error("Error updating task:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating task:", error);
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
  margin-bottom: 20px;
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
