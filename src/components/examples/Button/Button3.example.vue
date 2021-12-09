<example>
文字按钮
</example>
<template>
  <jeremy-button class="btn" theme="link">链接按钮</jeremy-button>
  <jeremy-button class="btn" theme="text">文字按钮</jeremy-button>
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
  margin: 5px;
}
</style>
