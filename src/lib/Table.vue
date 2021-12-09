<template>
  <table class="jeremy-table" :bordered="bordered">
    <slot></slot>
  </table>
</template>

<script lang="ts">
declare const props: {
  bordered: boolean;
};

export default {
  install: function (Vue) {
    Vue.component(this.name, this);
  },
  name: "JeremyTable",
  props: {
    bordered: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.jeremy-table {
  width: 100%;
  text-align: left;
  border-spacing: 0;
  th,
  td {
    padding: 12px;
  }
  tbody {
    > tr {
      transition: background-color 250ms;
      &:nth-child(even) {
        background: rgb(247, 247, 247);
      }
      &:hover {
        background: #d3c8f5;
      }
    }
  }
}
.jeremy-table[bordered="true"] {
  border: 1px solid rgb(235, 235, 235);
  tr,
  th,
  td {
    border: 1px solid rgb(235, 235, 235);
  }
}
</style>
