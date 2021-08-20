<template>
  <div>
    <disply-messages />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DisplyMessages from "@/components/DisplyMessages.vue";

@Component({
  components: {
    DisplyMessages,
  },
})
export default class Home extends Vue {}
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

    &-item {
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
