<template>
  <div id="app">
    <Top></Top>
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件，比如 Home！ -->
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </div>
</template>

<script>
  import Top from './base/Top.vue';
  export default {
    data() {
      return {
        ifLogin: false
      }
    },

    name: 'App',
    components: {
      Top
    }
  }

</script>

<style>
  @import url('./css/reset.css');
  .el-badge__content.is-fixed{
    top:10px !important;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to
  /* .fade-leave-active below version 2.1.8 */

    {
    opacity: 0;
  }

  .pagination {
    text-align: center;
    padding-top: 40px;
    margin: 0 auto;
  }

</style>
