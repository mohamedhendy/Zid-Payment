<template>
  <form @submit.prevent="submitForm">
    <div class="wrapper" style="max-width: 650px">
      <div class="form-group">
        <label> Name</label>
        <input class="form-control" v-model="UserInfo.name" type="text" placeholder="" />
      </div>
      <div class="form-group">
        <label>Age</label>
        <input class="form-control" v-model="UserInfo.age" type="number" placeholder="" />
      </div>
      <div class="form-group">
        <label>Date Of Birth</label>
        <input class="form-control" v-model="UserInfo.dob" type="date" placeholder="" />
      </div>
      <div class="form-group">
        <button class="save-btn" type="submit">Save</button>
      </div>
    </div>
  </form>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { getAssetPath } from '@/core/helpers/assets'
import { type userDetails } from './types'
import { ref } from 'vue'

export default defineComponent({
  setup() {
    let UserInfo = ref<userDetails>({
      name: 'zid Tech',
      age: 28,
      dob: '2024-03-20'
    })

    function submitForm() {
      console.log(UserInfo.value)
    }
    return { UserInfo, getAssetPath, submitForm }
  }
})
</script>
<style>
label {
  font-size: 13px;
  font-weight: 400;
  display: block;
  margin-bottom: 0.5rem;
}
.form-group {
  margin-bottom: 2rem;
}
.form-control {
  display: block;
  width: 100%;
  height: calc(1.5em + 1.3rem + 2px);
  padding: 0.65rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ebedf2;
  border-radius: 4px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out,
    -webkit-box-shadow 0.15s ease-in-out;
}
.save-btn {
  color: #fff;
  background-color: #5d78ff;
  border-color: #5d78ff;
  border: 1px solid transparent;
  padding: 0.85rem 2.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
