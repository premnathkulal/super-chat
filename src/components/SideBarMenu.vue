<template>
  <div class="sidebar-menu">
    <div class="menu-options">
      <div
        @click="$emit('selectTabType', 'personal')"
        class="options personal-chat"
      >
        <font-awesome-icon icon="comments" class="fa" />
      </div>
      <div @click="$emit('selectTabType', 'group')" class="options group-chat">
        <font-awesome-icon icon="users" class="fa" />
      </div>
      <div class="options profile">
        <font-awesome-icon
          icon="user"
          @click="$emit('selectTabType', 'Profile')"
          class="fa fa-user"
        />
      </div>
      <div @click="$emit('selectTabType', 'Create')" class="options add-btn">
        <font-awesome-icon icon="plus-circle" class="fa" />
      </div>
      <div v-if="lightTheme" @click="toggleTheme()" class="options theme-icon">
        <font-awesome-icon icon="moon" class="fa" />
      </div>
      <div v-else @click="toggleTheme()" class="options theme-icon">
        <font-awesome-icon icon="sun" class="fa" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class SideBarMenu extends Vue {
  lightTheme = true;

  toggleTheme(): void {
    this.lightTheme = !this.lightTheme;
    this.$emit("selectTabType", "theme-change");
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

    font-size: 1.5rem;
    .options {
      padding: 1rem;
      padding-top: 2rem;
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
