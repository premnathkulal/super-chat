<template>
  <v-list-item @click="chatWithEmail(index)" class="contact">
    <v-list-item-avatar>
      <v-img
        :alt="`${contact.name} avatar`"
        :src="contact.picUrl || '/assets/user.png'"
      ></v-img>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title v-text="contact.name"></v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import { ContactList } from "@/types/interface";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Contact extends Vue {
  @Prop({ default: "" }) index!: string;
  @Prop({ default: [] }) contact!: ContactList[];

  chatWithEmail(index: string): void {
    this.$router.push({ name: "PersonalChat", params: { id: index } });
  }
}
</script>

<style lang="scss">
.contact {
  cursor: pointer;
  background: #b0dee44b;
  margin-bottom: 0.5rem;
  &:hover {
    background: #b0dee4b6;
  }
}
</style>
