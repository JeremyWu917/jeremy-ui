<template>
  <div class="jeremy-card" :style="{ '--color': color }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
declare const props: {
  color: string;
};

export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyCard",
  props: {
    color: {
      type: String,
      default: "#8c6fef",
    },
  },
};
</script>

<style lang="scss">
.jeremy-card {
  border-radius: 8px;
  box-shadow: 0px 0px 10px 0px var(--color);
  padding: 12px;
  background: white;
}
</style>
