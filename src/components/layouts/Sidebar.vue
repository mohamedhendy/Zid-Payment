<template>
  <div class="sidebar">
    <div class="project-name">
      <span style="color: #5bff79; margin-right: 5px">Zid</span> Payment
    </div>
    <ul class="menu-links">
      <li>
        <RouterLink to="/">
          <span class="icon"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              /></svg></span
          >profile</RouterLink
        >
      </li>
      <li>
        <RouterLink to="/payments">
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-credit-card-2-back"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5z"
              />
              <path
                d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1m-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1"
              />
            </svg>
          </span>
          payment</RouterLink
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'SidebarMenu'
})
</script>
<style lang="scss">
.sidebar {
  color: #fff;
  width: 255px;
  max-width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 98;
  background-color: #1e1e2d;

  @media screen and (max-width: 576px) {
    color: #fff;
    width: 100%;
    max-width: 100%;
    position: relative;
  }
}
.project-name {
  display: flex;
  align-items: center;
  height: 65px;
  padding: 0 25px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 800;
  font-size: 20px;
  border-bottom: 3px solid #000;
}
.menu-links {
  list-style: none;
  padding: 0;
}
.menu-links,
.menu-links * {
  color: #d9d9d9;
  text-decoration: none !important;
}

.menu-links li a {
  transition: 0.2s all ease-in-out;
  padding: 15px 20px;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  &:hover {
    color: #fff;
    background-color: #151525;
  }
  .icon {
    margin-right: 5px;
    vertical-align: middle;
    svg {
      width: 27px;
      height: 20px;
      filter: opacity(0.5);
    }
  }
}
.router-link-active {
  color: #fff;
  background-color: #151525;
}
</style>
