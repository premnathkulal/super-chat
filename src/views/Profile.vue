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
      <div class="name">Navin Kumar</div>
      <div class="user-name">navin123</div>
      <div class="button">Logout</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Profile extends Vue {
  userPicUrl = "https://avatars.dicebear.com/api/avataaars/navin123.svg";
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
    background: red;

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
    }
    .button {
      margin-top: 1rem;
      background: #30224b;
      font-size: 1.1rem;
      color: white;
      cursor: pointer;
    }
  }
}
</style>
