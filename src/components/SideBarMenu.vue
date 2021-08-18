<template>
  <div class="sidebar-menu">
    <div class="menu-options">
      <div class="options personal-chat">
        <i class="fa fa-comments"></i>
      </div>
      <div class="options group-chat">
        <i class="fa fa-users"></i>
      </div>
      <div class="options profile">
        <i class="fa fa-user"></i>
      </div>
      <div class="options add-btn">
        <i class="fa fa-plus-circle"></i>
      </div>
      <div v-if="lightTheme" @click="toggleTheme()" class="options theme-icon">
        <i class="fa fa-moon-o"></i>
      </div>
      <div v-else @click="toggleTheme()" class="options theme-icon">
        <i class="fa fa-sun-o"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SideBarMenu extends Vue {
  lightTheme = true;

  toggleTheme(): void {
    this.lightTheme = !this.lightTheme;
  }
}
</script>

<style lang="scss">
.sidebar-menu {
  background: #30224b;
  width: 4rem;
  position: relative;
  height: 100vh;
  top: 0;
  left: 0;
  .menu-options {
    display: flex;
    height: 100%;
    flex-direction: column;
    padding-top: 1rem;
    font-size: 1.5rem;
    .options {
      padding: 1rem;
      color: white;
      text-align: center;
      &:hover {
        cursor: pointer;
        opacity: 0.5;
      }
    }
    .theme-icon {
      margin-top: auto;
    }
  }
}
</style>
