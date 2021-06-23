<template>
  <div v-if="true" class="user-pic">
    <v-list-item-avatar class="img">
      <v-img :src="'/assets/user.png'" alt="profilepic"></v-img>
    </v-list-item-avatar>
    <!-- <div
            v-else
            class="alt-profile-pic img mr-2"
            :style="{
              background: getColor(msg.email.length),
            }"
          >
            <span>{{ msg.email.slice(0, 2) }}</span>
          </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { namespace } from "vuex-class";

const user = namespace("User");

@Component
export default class DisplyProfilePic extends Vue {
  prevUserId = "";
  // displayImage = false;
  @Prop({ default: "" }) userId!: string;
  @Prop({ default: "" }) reciverEmail!: string;

  @user.Getter("getUserId")
  public muserId!: string;

  @user.Action("prem_a")
  public setId!: (userId: string) => Promise<string>;

  // @Watch("userId")
  // updatesd(): void {
  //   if (!this.prevUserId) {
  //     console.log(this.userId);
  //   } else {
  //     console.log(this.userId);
  //   }
  // }

  // created(): void {
  //   this.displayImage = false;
  //   if (!this.muserId) {
  //     this.setId(this.userId);
  //     return;
  //   }
  //   if (this.muserId !== this.userId) {
  //     console.log("HI");
  //     this.displayImage = true;
  //     this.setId(this.userId);
  //   }
  // }
}
</script>

<style lang="scss">
</style>
