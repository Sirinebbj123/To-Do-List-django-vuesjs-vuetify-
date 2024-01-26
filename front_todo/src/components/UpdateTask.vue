<template>
    <div>
      <h2 class="update-title">Update Task</h2>
      <form class="update-form">
        <label for="title" class="update-label">Title:</label>
        <input id="title" type="text" v-model="updatedTitle" class="update-input" />
  
        <label for="description" class="update-label">Description:</label>
        <textarea id="description" v-model="updatedDescription" class="update-textarea"></textarea>
  
        <button @click="updateTask" class="update-btn">{{ completed }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        updatedTitle: '',
        updatedDescription: '',
        completed: 'Update'
      };
    },
    methods: {
      updateTask() {
        const taskId = this.$route.params.taskId;
  
        // Effectuer une requête HTTP pour mettre à jour la tâche dans l'API Django
        axios.put(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
          title: this.updatedTitle,
          description: this.updatedDescription
        })
        .then(response => {
          // Traitement de la réponse
          console.log('Task updated successfully:', response.data);
          this.completed = 'Updated!';
        })
        .catch(error => {
          console.error('Erreur lors de la mise à jour de la tâche:', error);
        });
      }
    }
  };
  </script>
  
  <style scoped>
  .update-title {
    color: #1f087c;
    margin-bottom: 20px;
    font-family: 'Verdana', Geneva, Tahoma, sans-serif;
  }
  
  .update-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .update-label {
    display: block;
    margin-top: 10px;
    font-weight: bold;
  }
  
  .update-input,
  .update-textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #1f087c;
    border-radius: 5px;
    outline: none;
  }
  
  .update-btn {
    width: 100%;
    padding: 10px;
    cursor: pointer;
    background-color: #1f087c;
    color: #fff;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s;
  }
  
  .update-btn:hover {
    background-color: #0b1d77;
  }
  </style>
  