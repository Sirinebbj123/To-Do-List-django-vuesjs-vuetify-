<template>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage" class="prev-btn">Previous</button>
      <span class="page-info">Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage" class="next-btn">Next</button>
    </div>
  </template>
  <script setup>
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['page-changed']);

const prevPage = () => {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    emit('page-changed', props.currentPage + 1);
  }
};
</script>
<style scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f3f3f3;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.prev-btn,
.next-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.prev-btn:hover,
.next-btn:hover {
  background-color: #0056b3;
}

.prev-btn:disabled,
.next-btn:disabled {
  background-color: #c0c0c0;
  cursor: not-allowed;
}

.page-info {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
