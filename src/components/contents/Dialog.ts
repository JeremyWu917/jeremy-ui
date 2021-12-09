import JeremyComponent1 from "../examples/Dialog/Dialog1.example.vue";
import JeremyComponent2 from "../examples/Dialog/Dialog2.example.vue";
// import JeremyComponent3 from "../examples/Dialog/Dialog3.example.vue";

export default {
  components: [
    JeremyComponent1,
    JeremyComponent2,
    // JeremyComponent3,
  ],
  attributes: [
    { attr: 'visible', desp: '是否可见', type: 'boolean', values: 'false / true', default: 'false' },
    { attr: 'title', desp: '标题', type: 'string', values: '任意字符串', default: '必填' },
    { attr: 'ok', desp: '确定回调', type: '()=>boolean', values: '返回 boolean 的函数', default: '()=>true' },
    { attr: 'cancel', desp: '取消回调', type: '()=>boolean', values: '返回 boolean 的函数', default: '()=>true' },
  ]
};