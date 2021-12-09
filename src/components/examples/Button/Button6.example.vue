<example>
不同颜色
</example>
<template>
  <jeremy-button class="btn" color="blue">蓝色按钮</jeremy-button>
</template>
<script lang="ts">
import JeremyButton from "../../../lib/Button.vue";
export default {
  components: {
    JeremyButton,
  },
};
</script>

<style lang="scss" scoped>
.btn {
  margin: 1px;
}
</style>
