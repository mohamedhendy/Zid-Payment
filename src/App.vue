<script setup lang="ts">
import { RouterView } from 'vue-router'
import SidebarMenu from './components/layouts/Sidebar.vue'
</script>

<template>
  <div>
    <div>
      <SidebarMenu />
      <div class="main-content">
        <div class="card">
          <RouterView />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-content {
  padding-left: 255px;
}

.card {
  box-shadow: 0px 0px 13px 0px rgba(82, 63, 105, 0.05);
  background-color: #ffffff;
  border-radius: 4px;
  padding: 40px;
  min-height: 98vh;
}
@media screen and (max-width: 576px) {
  .main-content {
    padding-left: 0;
  }
  .card {
    padding: 40px 20px;
  }
}
</style>
