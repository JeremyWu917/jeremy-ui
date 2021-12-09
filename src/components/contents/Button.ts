import JeremyComponent1 from "../examples/Button/Button1.example.vue";
import JeremyComponent2 from "../examples/Button/Button2.example.vue";
import JeremyComponent3 from "../examples/Button/Button3.example.vue";
import JeremyComponent4 from "../examples/Button/Button4.example.vue";
import JeremyComponent5 from "../examples/Button/Button5.example.vue";
import JeremyComponent6 from "../examples/Button/Button6.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
    JeremyComponent3,
    JeremyComponent4,
    JeremyComponent5,
    JeremyComponent6,
  ],
  attributes: [
    { attr: 'level', desp: '默认类型', type: 'string', values: 'default / plain / primary / success / info / warning / danger', default: 'default' },
    { attr: 'disabled', desp: '是否禁用', type: 'boolean', values: 'false / true', default: 'false' },
    { attr: 'theme', desp: '式样', type: 'string', values: 'button / link / text', default: 'button' },
    { attr: 'loding', desp: '是否加载中', type: 'boolean', values: 'false / true', default: 'false' },
    { attr: 'size', desp: '尺寸', type: 'string', values: 'middle / small / large', default: 'middle' },
    { attr: 'color', desp: '颜色', type: 'string', values: '任意合法颜色值', default: '#8c6fef' },
  ]
};