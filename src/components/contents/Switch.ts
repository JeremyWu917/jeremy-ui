import JeremyComponent1 from "../examples/Switch/Switch1.example.vue";
import JeremyComponent2 from "../examples/Switch/Switch2.example.vue";
import JeremyComponent3 from "../examples/Switch/Switch3.example.vue";
import JeremyComponent4 from "../examples/Switch/Switch4.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
    JeremyComponent3,
    JeremyComponent4,
  ],
  attributes: [
    { attr: 'value', desp: '默认选择状态', type: 'boolean', values: 'false / true', default: 'false' },
    { attr: 'size', desp: '尺寸', type: 'string', values: 'middle / small / large', default: 'middle' },
    { attr: 'color', desp: '颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' },
    { attr: 'disabled', desp: '是否禁用', type: 'boolean', values: 'false / true', default: 'false' },
  ]
};