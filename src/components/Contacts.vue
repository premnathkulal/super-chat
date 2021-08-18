<template>
  <div class="contacts">
    <div class="input-area">
      <div class="search-box">
        <input type="text" class="text-box" placeholder="Search..." />
        <i class="fa fa-search"></i>
      </div>
    </div>
    <div class="contact-list">
      <div class="contact-info">
        <div class="profile-pic"></div>
        <div class="contact-details">
          <div class="name">Navin: Good Evening</div>
          <div class="msg-status">Pramod: Cool</div>
        </div>
      </div>
      <div class="contact-info">
        <div class="profile-pic"></div>
        <div class="contact-details">
          <div class="name">Navin</div>
          <div class="msg-status">Navin: Good Evening</div>
        </div>
      </div>
      <div class="contact-info">
        <div class="profile-pic"></div>
        <div class="contact-details">
          <div class="name">Week End Party</div>
          <div class="msg-status">vidya: Nothing!!!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Contacts extends Vue {}
</script>

<style lang="scss">
.contacts {
  background: #e7eff8;
  width: 24rem;

  @media only screen and (max-width: 800px) {
    width: 100%;
  }

  position: relative;
  height: 100vh;
  top: 0;
  left: 200;

  .input-area {
    padding: 1rem;

    .search-box {
      display: flex;
      width: 100%;
      align-items: center;
      background: white;
      padding: 0.4rem 0.5rem;
      border-radius: 5rem;
      box-shadow: 5px 7px 8px rgb(201, 198, 198);

      .text-box {
        border: none;
        box-shadow: none;
        outline: none;
        flex: 1;
      }
    }
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .contact-info {
      margin-top: 0.5rem;
      display: flex;
      padding: 0.5rem;

      .profile-pic {
        width: 2.5rem;
        height: 2.5rem;
        background: black;
        border-radius: 50%;
      }
      .contact-details {
        padding-left: 1rem;
        display: flex;
        flex-direction: column;

        .name {
          font-size: 1.2rem;
          font-weight: 500;
        }
        .msg-status {
          font-size: 0.9rem;
        }
      }
      &:hover {
        cursor: pointer;
        background: rgba(#30224b, 0.1);
      }
    }
  }
}
</style>
