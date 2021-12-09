<template>
  <input
    v-if="theme === 'input'"
    class="jeremy-input-input"
    :style="{ '--color': color }"
    v-model="text"
    @input="change"
  />
  <textarea
    v-else
    class="jeremy-input-textarea"
    :rows="rows"
    :style="{ '--color': color }"
    v-model="text"
    @input="change"
  />
</template>

<script lang="ts">
import { ref, SetupContext } from "vue";
declare const props: {
  value: string;
  theme?: "input" | "textarea";
  rows?: number;
  color?: string;
};
declare const context: SetupContext;

export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyInput",
  props: {
    value: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      default: "input",
    },
    rows: {
      type: Number,
      default: 5,
    },
    color: {
      type: String,
      default: "#8c6fef",
    },
  },
  setup(props, context) {
    const text = ref(props.value);
    const change = () => {
      context.emit("update:value", text.value);
    };
    return { text, change };
  },
};
</script>

<style lang="scss">
$theme-color: var(--color);
[class^="jeremy-input"] {
  resize: none;
  padding: 8px;
  border-radius: 4px;
  border: none;
  box-shadow: 0px 0px 3px 0px $theme-color;
  outline: none;
  width: 100%;
  &[disabled] {
    box-shadow: 0px 0px 3px 0px gray;
  }
}
</style>
