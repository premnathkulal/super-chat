<template>
  <div class="contacts">
    <div class="input-area">
      <div class="search-box">
        <input type="text" class="text-box" placeholder="Search..." />
        <font-awesome-icon icon="search" />
      </div>
    </div>
    <div class="contact-list">
      <!-- <template v-for="(i, index) in 4">
        <div
          :key="`${index}-${i}`"
          v-if="tabType === 'all' || tabType === 'personal'"
          class="contact-info"
          @click="enterChat(`Name ${i}`)"
        >
          <img
            class="profile-pic"
            :src="`https://avatars.dicebear.com/api/avataaars/Name-${i}.svg`"
            alt="user-img"
          />
          <div class="contact-details">
            <div class="name">Navin</div>
            <div class="msg-status">Navin: Good Evening</div>
          </div>
        </div>
      </template> -->
      <template v-for="item in group">
        <div
          :key="item._id"
          v-if="tabType === 'all' || tabType === 'group'"
          class="contact-info"
          @click="enterChat(item)"
        >
          <img
            class="profile-pic"
            :src="`https://avatars.dicebear.com/api/avataaars/${item._id}.svg`"
            alt="user-img"
          />
          <div class="contact-details">
            <div class="name">{{ item.groupName }}</div>
            <div class="msg-status">Vidya: Nothing!!!</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { SocketActions } from "@/types/types";
import { Vue, Component, Prop } from "vue-property-decorator";
import { namespace } from "vuex-class";

const contacts = namespace("Contacts");
const socket = namespace("Socket");

@Component
export default class Contacts extends Vue {
  @Prop({ default: "all" }) tabType!: string;

  groupInfo: { _id: string; groupName: string; groupOwners: string[] } = {
    _id: "",
    groupName: "",
    groupOwners: [],
  };

  @contacts.Getter
  group!: any;

  @socket.Action(SocketActions.JOIN_ROOM)
  public joinRoom!: (payload: { userInfo: string; room: string }) => void;

  @socket.Action(SocketActions.LEAVE_ROOM)
  public leaveRoom!: (payload: { userInfo: string; room: string }) => void;

  leaveChat(data: { userInfo: string; room: string }): void {
    this.leaveRoom(data);
  }

  enterChat(data: {
    _id: string;
    groupName: string;
    groupOwners: string[];
  }): void {
    if (this.groupInfo) {
      this.leaveChat({
        userInfo: "",
        room: this.groupInfo._id,
      });
    }
    this.groupInfo = data;
    this.$emit("loadMessage", data);
    this.joinRoom({
      userInfo: "",
      room: data._id,
    });
  }
}
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
    margin-right: 1.5rem;

    .search-box {
      display: flex;
      width: 100%;

      align-items: center;
      background: white;
      padding: 0.4rem 0.5rem;
      border-radius: 5rem;
      box-shadow: 5px 7px 8px rgb(201, 198, 198);

      .text-box {
        height: 1.5rem;
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
