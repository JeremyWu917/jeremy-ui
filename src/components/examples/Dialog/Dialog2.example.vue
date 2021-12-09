<example>
禁止取消对话框
</example>
<template>
  <jeremy-button @click="visible = true">打开对话框</jeremy-button>
  <jeremy-dialog
    v-model:visible="visible"
    title="标题"
    :ok="ok"
    :cancel="preventCancel"
  >
    <span> 内容 </span>
  </jeremy-dialog>
</template>
<script lang="ts">
import { JeremyButton,  JeremyDialog } from "jeremy-ui";

import { ref } from "vue";
export default {
  components: {
    JeremyButton,
    JeremyDialog,
  },
  setup() {
    const visible = ref(false);
    const ok = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log("ok");
          resolve(true);
        }, 1000);
      });
    };
    const preventCancel = () => {
      console.log("preventCancel");
      return false;
    };
    return { visible, ok, preventCancel };
  },
};
</script>