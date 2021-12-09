<example>
基础用法
</example>
<template>
  <jeremy-table>
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
      <tr v-if="insertVisible">
        <td v-for="key in keys" :key="key">
          <jeremy-input v-model:value="newData[key]" />
        </td>
        <td>
          <jeremy-button @click="add">确定</jeremy-button>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <jeremy-button @click="insertVisible = !insertVisible">
          <span v-if="insertVisible">取消添加</span>
          <span v-else>添加记录</span>
        </jeremy-button>
      </tr>
    </tfoot>
  </jeremy-table>
</template>
<script lang="ts">
import { JeremyTable, JeremyButton, JeremyInput } from "jeremy-ui";

import { ref } from "vue";
export default {
  components: {
    JeremyTable,
    JeremyButton,
    JeremyInput,
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
    const insertVisible = ref(false);
    const newData = ref(
      keys.reduce((obj, item) => {
        obj[item] = "";
        return obj;
      }, {})
    );
    const add = () => {
      datas.value.push(newData.value);
      newData.value = keys.reduce((obj, item) => {
        obj[item] = "";
        return obj;
      }, {});
      insertVisible.value = false;
    };
    return { insertVisible, heads, keys, datas, del, newData, add };
  },
};
</script>