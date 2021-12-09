import JeremyComponent1 from "../examples/Table/Table1.example.vue";
import JeremyComponent2 from "../examples/Table/Table2.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2
  ],
  attributes: [
    { attr: 'heads', desp: '表头', type: 'Array', values: '数组，每一项包含两个 string 字段：name、identifier', default: '必填' },
    { attr: 'datas', desp: '表数据', type: 'Array', values: '数组，每一项包含与 heads 相同数量的 string 字段', default: '必填' },
    { attr: 'bordered', desp: '是否有边框', type: 'boolean', values: 'false / true', default: 'false' },
  ]
};