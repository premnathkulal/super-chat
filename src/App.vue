<template>
  <div>Hello, World</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Login from "@/components/Login.vue";
import ErrorPages from "@/components/ErrorPages.vue";
import firebase from "firebase";

@Component({
  components: {
    Login,
    ErrorPages,
  },
})
export default class ChatApp extends Vue {
  dialog = false;
  user = firebase.auth().currentUser;
  isOnline = false;

  logout(): void {
    firebase.auth().signOut();
    this.user = null;
  }
}
</script>
