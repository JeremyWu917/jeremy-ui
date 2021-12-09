<example>
有边框的表格
</example>
<template>
  <jeremy-table bordered>
    <thead>
      <tr>
        <th v-for="(head, index) in heads" :key="index">{{ head.name }}</th>
        <th>其余操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(data, index) in datas" :key="index">
        <td v-for="key in keys" :key="key" v-html="data[key]"></td>
        <td>
          <jeremy-button @click="del(index)">删除</jeremy-button>
        </td>
      </tr>
    </tbody>
  </jeremy-table>
</template>
<script lang="ts">
import JeremyTable from "../../../lib/Table.vue";
import JeremyButton from "../../../lib/Button.vue";

import { ref } from "vue";
export default {
  components: {
    JeremyTable,
    JeremyButton,
  },
  setup() {
    const heads = ref([
      { name: "参数", identifier: "attr" },
      { name: "类型", identifier: "type" },
    ]);
    const keys = heads.value.map((item: any) => item.identifier);
    const datas = ref([
      { attr: "level", type: "string" },
      { attr: "size", type: "string" },
      { attr: "loading", type: "boolean" },
    ]);
    const del = (index) => {
      datas.value = datas.value.filter((item, i) => i != index);
    };
    return { heads, keys, datas, del };
  },
};
</script>