<template>
  <div class="welcome-screen">
    <lottie-player
      autoplay
      loop
      mode="normal"
      style="width: 550px"
      src="/assets/namaste.json"
      background="transperant"
    >
    </lottie-player>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class WelcomeScreen extends Vue {
  lightTheme = true;

  toggleTheme(): void {
    this.lightTheme = !this.lightTheme;
    this.$emit('selectTabType', 'theme-change');
  }
}
</script>

<style lang="scss">
.welcome-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
