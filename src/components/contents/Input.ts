import JeremyComponent1 from "../examples/Input/Input1.example.vue";
import JeremyComponent2 from "../examples/Input/Input2.example.vue";
import JeremyComponent3 from "../examples/Input/Input3.example.vue";
import JeremyComponent4 from "../examples/Input/Input4.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
    JeremyComponent3,
    JeremyComponent4,
  ],
  attributes: [
    { attr: 'value', desp: '绑定值', type: 'string', values: '字符串', default: '必填' },
    { attr: 'theme', desp: '类型', type: 'string', values: 'input / textarea', default: 'input' },
    { attr: 'rows ', desp: '行高，但当 theme 为 input 时值恒为1', type: 'number', values: '正整数', default: '5' },
    { attr: 'color', desp: '外边框颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' }
  ]
};