<template>
  <button class="custom-button" @click="$emit('btnAction')">
    {{ btnName }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class CustomButton extends Vue {
  @Prop({ default: "" }) btnName!: string;
  @Prop({ default: false }) disableButton!: boolean;
}
</script>

<style lang="scss">
.custom-button {
  width: 100%;
  background: #30224b;
  color: white;
  text-align: center;
  font-weight: bold;
  padding: 0.6rem;
  cursor: pointer;
  box-shadow: none;
  outline: none;
  border: none;
  box-shadow: 0px 0px 0px rgb(153, 149, 149);
  font-size: 1rem;
}
</style>
