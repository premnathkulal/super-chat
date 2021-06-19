<template>
  <div class="profile-page">
    <!-- <img  /> -->
    <div class="image-upload">
      <label for="file-input">
        <v-avatar size="200">
          <v-progress-circular
            v-if="isLoading"
            indeterminate
            color="amber"
            class="progress-bar"
            :size="50"
          ></v-progress-circular>
          <img
            :src="downloadURL || '/assets/user.png'"
            :class="{ opacity: isLoading }"
          />
        </v-avatar>
      </label>
      <input
        id="file-input"
        type="file"
        accept="image"
        @change="detectFiles($event.target.files)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import firebase from "firebase";
import { namespace } from "vuex-class";
import { UserActions } from "@/utils/types";

const user = namespace("User");
@Component
export default class Home extends Vue {
  user = firebase.auth().currentUser;
  uploadTask: any = {};
  userEmail: string | null = "";
  isLoading = false;
  downloadURL: any = "";

  profile: {
    profilePic: string;
    name: string;
    phoneNumber: string;
  } = {
    profilePic: "",
    name: "",
    phoneNumber: "",
  };

  @user.Action(UserActions.SET_USER_PIC)
  public updatePic!: (downloadURL: string) => void;

  @user.Action(UserActions.GET_USER_PIC)
  public getProfilePic!: (email: string) => Promise<void>;

  detectFiles(fileList: any) {
    this.isLoading = true;
    const storage = firebase.storage();
    this.uploadTask = storage
      .ref(`${this.userEmail}-profilePic`)
      .put(fileList[0])
      .then((res) => {
        res.task.snapshot.ref.getDownloadURL().then((downloadURL: string) => {
          this.isLoading = false;
          this.updatePic(downloadURL);
          this.downloadURL = downloadURL;
        });
      });
  }

  created(): void {
    if (this.user) {
      this.userEmail = this.user.email;
      this.getProfilePic(this.userEmail as string).then((res) => {
        console.log(res);
        this.downloadURL = res;
      });
    }
  }
}
</script>

<style lang="scss">
.profile-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 86vh;
  padding: 1rem;

  .image-upload {
    .progress-bar {
      position: absolute;
      z-index: 1000;
      background: transparent;
    }
    input {
      display: none;
    }
  }

  .opacity {
    filter: brightness(50%);
  }
}
</style>
