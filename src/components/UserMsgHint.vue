<template>
  <div>
    <span v-if="!isLoading">Vidya: {{ lastMessage[roomId].message }}</span>
  </div>
</template>

<script lang="ts">
import { ChatActions } from '@/types/types';
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const contacts = namespace('Contacts');
const socket = namespace('Socket');
const chat = namespace('Chat');

@Component
export default class UserMsgHint extends Vue {
  // loading = true;
  @Prop({ default: '' }) roomId!: string;

  // @chat.State
  // loading!: boolean;

  @chat.State('loading')
  public isLoading!: boolean;

  @chat.Action(ChatActions.SET_LOADING)
  public setLoading!: (loading: boolean) => void;

  @chat.Getter
  getLatMessage!: any;

  lastMessage = [
    {
      message: '',
    },
  ];

  created(): void {
    setTimeout(() => {
      // this.loading = false;
      this.lastMessage = this.getLatMessage;
      console.log(this.lastMessage);
      this.setLoading(false);
    }, 5000);
  }
}
</script>
