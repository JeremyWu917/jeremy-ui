<example>
不同尺寸
</example>
<template>
  <jeremy-button class="btn" size="large">大号按钮</jeremy-button>
  <jeremy-button class="btn">中号按钮</jeremy-button>
  <jeremy-button class="btn" size="small">小号按钮</jeremy-button>
</template>
<script lang="ts">
import {JeremyButton} from "jeremy-ui";
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
