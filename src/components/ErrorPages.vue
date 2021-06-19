<template>
  <div class="container error-page">
    <div v-if="pageName === 'login'" class="login-request">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/assets/login.json"
        style="width: 320px; height: 200px"
      >
      </lottie-player>
      <v-btn @click="$emit('showModal')">
        <span>Login</span>
      </v-btn>
    </div>
    <div v-if="pageName === 'noInternet'" class="no-internet">
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="/assets/no-internet.json"
        style="width: 320px; height: 250px"
      >
      </lottie-player>
      <span class="hint-text">Please Check your Connection</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  @Prop({ default: "login" }) pageName!: string;
}
</script>

<style lang="scss">
.error-page {
  .login-request,
  .no-internet {
    height: 85vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .hint-text {
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
}
</style>
