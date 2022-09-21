<template>
  <div id="app">
    <!--页面-->
    <van-pull-refresh v-model="isLoading"
                      :disabled="$store.state.isDisabled"
                      @refresh="reload">
      <keep-alive v-if="isRouterAlive">
        <router-view v-if="isRouterAlive && $route.meta.keep_alive"></router-view>
      </keep-alive>
      <router-view v-if="isRouterAlive && !$route.meta.keep_alive"></router-view>
    </van-pull-refresh>
    <!--loading-->
    <van-loading color="#ffa500"
                 v-show="$store.state.isLoading"
                 style="position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);" />
    <!--tabbar栏-->
    <van-tabbar route
                v-show="tabbar_show"
                :safe-area-inset-bottom="true"
                active-color="#ffa500"
                inactive-color="#999999">
      <van-tabbar-item replace
                       to="/warehouse"
                       :icon="this.$route.path === '/warehouse' ? require('./assets/image/searched.png')  : require('./assets/image/search.png')">
        广场</van-tabbar-item>
      <van-tabbar-item replace
                       to="/question"
                       :icon="this.$route.path === '/question' ? require('./assets/image/compassed.png')  : require('./assets/image/compass.png')">
        说明</van-tabbar-item>
      <van-tabbar-item replace
                       to="/myHome"
                       :icon="this.$route.path === '/myHome' ? require('./assets/image/personaled.png')  : require('./assets/image/personal.png')">
        我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      tabbar_show: true, // 是否显示下方的tabbar栏
      isLoading: false, // 下拉刷新
      isRouterAlive: true, // 用于单个页面的局部刷新
      tabbar_path: new Set([
        '/myHome',
        '/warehouse',
        '/question'
      ]), // 会显示tabbar的页面
      isDisabled_path: new Set([
        '/warehouse',
        '/test'
      ]),
      domHeight: document.documentElement.clientHeight,
      showHeight: document.documentElement.clientHeight
    }
  },
  // 向子组件提供局部刷新函数
  provide () {
    return {
      reload: this.reload
    }
  },
  methods: {
    // 局部刷新函数
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
        this.isLoading = false
      })
    }
  },
  watch: {
    // 哪些页面显示底部的tabbar栏，哪些页面不显示
    $route () {
      document.title = this.$route.meta.title
      if (this.tabbar_path.has(this.$route.path)) {
        this.tabbar_show = true
      } else {
        this.tabbar_show = false
      }
      if (this.isDisabled_path.has(this.$route.path)) {
        this.$store.commit('isDisabled', true)
      } else {
        this.$store.commit('isDisabled', false)
      }
    },
    showHeight () {
      if (this.domHeight > this.showHeight) {
        this.tabbar_show = false
      } else {
        this.tabbar_show = true
      }
    }
  },
  created () {
    // 网站标题
    document.title = this.$route.meta.title
    // 哪些页面显示底部的tabbar栏，哪些页面不显示
    if (this.tabbar_path.has(this.$route.path)) {
      this.tabbar_show = true
    } else {
      this.tabbar_show = false
    }
  },
  mounted () {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.documentElement.clientHeight
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  min-height: 100vh;
  background: #f8f8f8;
  margin: 0;
  padding: 0;
}
</style>
