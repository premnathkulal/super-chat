<template>
  <div>
    <div class="tabs-field">
      <div class="container tab">
        <template v-for="(item, index) in tabptions">
          <div
            class="tab-item"
            :class="{ active: tab === item.title }"
            :key="index"
            @click="loadTab(item.title)"
          >
            <v-icon>{{ item.icon }}</v-icon>
            <span class="d-none d-sm-block">{{ item.title }}</span>
          </div>
        </template>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  tab = "Contacts";
  tabptions = [
    {
      title: "Contacts",
      icon: "mdi-phone",
    },
    {
      title: "Group",
      icon: "mdi-account-group",
    },
    {
      title: "Profile",
      icon: "mdi-account",
    },
  ];

  loadTab(name: string): void {
    this.tab = name;
    if (this.$router.currentRoute.name !== name) {
      this.$router.push({ name });
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-field {
  position: fixed;
  left: 0;
  width: 100%;

  .tab {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 !important;
    cursor: pointer;

    .tab-item {
      width: 43.33%;
      background: rgb(199, 223, 236);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding-top: 1rem;
      padding-bottom: 0.5rem;
    }

    .active {
      background: rgba(177, 217, 240);
      border-bottom: 2px solid rgba(93, 121, 138, 0.918);
    }
  }
}
</style>
