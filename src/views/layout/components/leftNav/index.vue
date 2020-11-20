<template>
  <div style="height: 100%">
    <!-- <leftTitle /> -->
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#fff"
      text-color="#000"
      active-text-color="#577cff"
    >
      <el-submenu
        :index="index + 1"
        v-for="(item, index) in hasChildRoute"
        :key="index"
      >
        <template slot="title">
          <i :class="item.mata.icon"></i>
          <span>{{ item.meta.name }}</span>
        </template>
        <el-menu-item
          :index="`${index}-${b}`"
          v-for="(a, b) in item.children"
          :key="b"
          @click="jumpRoute(a)"
        >
          <i class="el-icon-menu"></i>
          <span slot="title">{{ a.meta.name }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item
        :index="id"
        v-for="(route, id) in noChildRoute"
        :key="id"
        @click="jumpRoute(route)"
      >
        <i :class="route.meta.icon"></i>
        <span slot="title">{{ route.meta.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// import leftTitle from "./leftTitle.vue";
export default {
  components: {
    // leftTitle
  },
  data() {
    return {
      filterRoute: []
    };
  },
  computed: {
    hasChildRoute() {
      return this.filterRoute.filter(route => route.children);
    },
    noChildRoute() {
      return this.filterRoute.filter(route => !route.children);
    }
  },
  created() {
    // console.log(this.$router.options.routes);
    this.getMeun(this.$router.options.routes);
  },
  methods: {
    getMeun(routerArr) {
      // routerArr.filters(v => )
      console.log(routerArr);
      this.filterRoute = routerArr.find(
        route => route.name == "layout"
      ).children;
      console.log(this.filterRoute);
    },
    jumpRoute({ name }) {
      console.log(name);
      this.$router.push({ name });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  box-sizing: border-box;
  //   height: calc(100% - $top-navHeight);
  // width: $left-menuWidth;
  height: 100%;
  border-radius: 10px !important;
  padding-top: 10px;
}
</style>
