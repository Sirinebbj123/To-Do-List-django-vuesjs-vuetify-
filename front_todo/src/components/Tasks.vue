<!-- tasks.vue -->

<template>

  <div>
    <input type="text" v-model="searchQuery" placeholder="Search tasks..." class="search-input" />
    <ul class="task-list">
      <li class="task-list-item" v-for="task in displayedTasks" :key="task.id">
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
          <button @click="openUpdateTaskPage(task)" class="update-btn">Update</button>
        </div>
      </li>
    </ul>
    <pagination :totalPages="totalPages" :currentPage="currentPage" @page-changed="changePage" />  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import Pagination from './Pagination.vue';

const tasks = ref([]);
const displayedTasks = ref([]);
const currentPage = ref(1);
const itemsPerPage = 5;
const router = useRouter();
const searchQuery = ref('');


const loadTasks = () => {
  const startIdx = (currentPage.value - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  displayedTasks.value = tasks.value
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    .slice(startIdx, endIdx);
};

const delItem = async (task) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'DELETE',
    });

    if (response.ok) {
      tasks.value = tasks.value.filter((t) => t.id !== task.id);
      calculateTotalPages(); // Update total pages after deleting a task
      loadTasks();
    } else {
      console.error("Error deleting task:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const updateTask = async (task) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: task.title,
        description: task.description,
        completed: task.completed,
      }),
    });

    if (!response.ok) {
      console.error("Error updating task:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

const openUpdateTaskPage = (task) => {
  router.push({
    name: 'UpdateTask',
    params: {
      taskId: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed
    }
  });
};

const fetchTasks = async () => {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/tasks/');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    tasks.value = await response.json();
    calculateTotalPages();
    loadTasks();
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

const totalPages = ref(1);

const calculateTotalPages = () => {
  totalPages.value = Math.ceil(tasks.value.length / itemsPerPage);
};

const changePage = (page) => {
  currentPage.value = page;
  loadTasks();
};

onMounted(() => {
  fetchTasks();
});

watch(tasks, calculateTotalPages);
watch(searchQuery, loadTasks);

</script>





  <style scoped>
  * {
    box-sizing: border-box;
    
  }

  .search-input {
    display: block;
    width: 300px;
    padding: 0.5rem;
    font-size: 1rem;
    margin-bottom: 1rem;
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
  