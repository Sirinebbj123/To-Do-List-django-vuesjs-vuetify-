<template>
    <div class="navbar">
      <div class="brand" @click="goHome">Home</div>
      <div class="nav-links">
        <div class="nav-item" @click="goCreateTask">Create a New Task</div>
        <div class="nav-item" @click="goTasks">Tasks</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/');
      },
      goCreateTask() {
        this.$router.push('/create');
      },
      goTasks() {
        this.$router.push('/tasks');
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #0e0760; /* Navbar background color */
    padding: 10px;
    color: #ecf0f1; /* Text color */
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  }
  
  .brand {
    cursor: pointer;
    font-size: 1.5em;
    font-weight: bold;
  }
  
  .nav-links {
    display: flex;
  }
  
  .nav-item {
    cursor: pointer;
    margin-left: 20px;
    transition: color 0.3s;
  }
  
  .nav-item:hover {
    color: #3498db;
  }
  </style>
  