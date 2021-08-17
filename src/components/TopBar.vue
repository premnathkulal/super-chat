<template>
  <div class="top-bar">
    <div class="top-bar-contents">
      <div
        v-if="showMenuIcon"
        class="top-bar-content menu-bar"
        @click="$emit('toggleDrawer')"
      >
        <i class="fa fa-bars"></i>
      </div>
      <div class="top-bar-content user-image">P</div>
      <div class="top-bar-content user-info">
        <div class="user-name">Pramod</div>
        <div class="typing-status">Typing...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TopBar extends Vue {
  @Prop({ default: false }) showMenuIcon!: boolean;
}
</script>

<style lang="scss">
.top-bar {
  background: #30224b;
  width: 100%;
  position: relative;
  height: 3.5rem;
  display: flex;
  align-items: center;

  .top-bar-contents {
    display: flex;
    flex-direction: row;

    .top-bar-content {
      color: white;
      text-align: right;
      margin-left: 1.5rem;
      display: flex;
      align-items: center;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;

      .user-name {
        font-size: 1.2rem;
      }
      .typing-status {
        font-size: 0.8rem;
      }
    }

    .menu-bar {
      display: flex;
      @media screen and (min-width: 800) {
        display: none;
      }
    }
    .user-image {
      width: 2.8rem;
      height: 2.8rem;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }
}
</style>
