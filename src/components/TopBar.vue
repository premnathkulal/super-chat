<template>
  <div class="top-bar">
    <div class="top-bar-contents">
      <div
        v-if="showMenuIcon"
        class="top-bar-content menu-bar"
        @click="$emit('toggleDrawer')"
      >
        <font-awesome-icon icon="chevron-left" />
      </div>
      <img
        class="top-bar-content user-image"
        :src="`https://avatars.dicebear.com/api/avataaars/${groupInfo}.svg`"
        alt="user-img"
      />
      <div class="top-bar-content user-info">
        <div class="user-name">{{ groupInfo.groupName }}</div>
        <div class="typing-status">Typing...</div>
      </div>
    </div>
    <font-awesome-icon
      v-if="tabType === 'group'"
      icon="info-circle"
      class="fa"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class TopBar extends Vue {
  @Prop({ default: false }) showMenuIcon!: boolean;
  @Prop({ default: "all" }) tabType!: string;
  @Prop({ default: "" }) groupInfo!: {
    _id: string;
    groupName: string;
    groupOwners: string[];
  };
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
    align-items: center;
    justify-content: center;

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
      width: 2.5rem;
      height: 2.5rem;
      background: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
  }

  .fa {
    margin-left: auto;
    margin-right: 1rem;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>
