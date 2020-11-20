import Vue from "vue";

function create(Component, props) {
  const vm = new Vue({
    render: h => h(Component, { props })
  }).$mount();
  console.log(vm);
  //   获取真实dom
  document.body.appendChild(vm.$el);

  const comp = vm.$children[0];

  comp.remove = () => {
    document.body.removeChild(vm.$el);
    vm.$destroy();
  };

  // 返回组件实例
  return comp;
}

export default create;
