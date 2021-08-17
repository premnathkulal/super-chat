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
      <div class="options profile">
        <i class="fa fa-plus-circle"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class SideBarMenu extends Vue {}
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
  }
}
</style>
