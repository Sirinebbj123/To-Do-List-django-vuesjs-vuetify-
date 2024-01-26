<template>
    <div class="home-container">
      <h1 ref="welcomeText">Welcome to ToDoList</h1>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    animateWelcomeText();
  });
  
  function animateWelcomeText() {
    const welcomeText = document.getElementById('welcome-text');
    if (welcomeText) {
      const text = welcomeText.innerText;
      welcomeText.innerHTML = '';
      for (let i = 0; i < text.length; i++) {
        const charSpan = document.createElement('span');
        charSpan.innerText = text[i];
        charSpan.style.animation = `colorChange 1s ${i * 0.1}s infinite alternate`;
        welcomeText.appendChild(charSpan);
      }
    }
  }
  </script>
  
  <style scoped>
  .home-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ffffff; /* Background color */
    color: #0c1279; /* Text color */
  }
  
  @keyframes colorChange {
    to {
      color: #e74c3c; /* Change to the desired color */
    }
  }
  </style>
  