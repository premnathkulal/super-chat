<template>
  <div class="profile-page">
    <div
      class="profile-pic"
      :style="`
        background-image: url(${userPicUrl});
      `"
    >
      <div class="camera-icon">
        <div icon="camera" class="fa">
          <font-awesome-icon icon="camera" />
        </div>
      </div>
    </div>

    <div class="user-info">
      <div class="name">{{ userInfo.name }}</div>
      <div class="user-name">{{ userInfo.email }}</div>
      <!-- <div class="button">Logout</div> -->
      <custom-button btnName="Logout" @btnAction="userLogout()" />
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { UserActions } from "@/types/types";
import { Vue, Component } from "vue-property-decorator";
import { namespace } from "vuex-class";
import CustomButton from "@/components/CustomButton.vue";

const user = namespace("User");

@Component({
  components: {
    CustomButton,
  },
})
export default class Profile extends Vue {
  userPicUrl = "https://avatars.dicebear.com/api/avataaars/navin123.svg";

  @user.Getter
  public userInfo!: any;

  @user.Action(UserActions.LOGOUT)
  public logout!: () => void;

  async userLogout(): Promise<void> {
    await this.logout();
    router.push({ name: "Auth" });
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .profile-pic {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 10rem;
    width: 10rem;
    padding: 1rem;
    border-radius: 50%;
    overflow: hidden;
    background-size: cover;
    background: rgb(175, 174, 174);

    .camera-icon {
      display: none;
    }

    &:hover {
      .camera-icon {
        display: block;
        cursor: pointer;

        .fa {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2.5rem;
          color: black;
          background: rgba(0, 0, 0, 0.418);
          height: 20rem;
          width: 20rem;
        }
      }
    }
  }

  .user-info {
    font-weight: bold;
    font-size: 1.3rem;
    text-align: center;
    font-weight: 400;
    padding: 0.8rem;
    line-height: 2rem;

    .name {
    }
    .user-name {
      padding-bottom: 0.5rem;
    }
  }
}
</style>
