<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { provide, ref } from "vue";
export default {
  name: "App",
  setup() {
    const width = ref(document.documentElement.clientWidth);
    const menuVisible = ref(width.value > 500 ? true : false);
    window.onresize = () => {
      width.value = document.documentElement.clientWidth;
      if (width.value > 500) {
        menuVisible.value = true;
      } else {
        menuVisible.value = false;
      }
    };

    provide("menuVisible", menuVisible);
  },
};
</script>
<style lang="scss" scoped>
$max-width: 1200px;
.app {
  max-width: $max-width;
  margin-left: calc(50vw - 600px);
  position: relative;
  @media (max-width: $max-width) {
    margin-left: 0;
  }
}
</style>
