<template>
  <div>
    <div class="main">{{id}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  computed:{
    id(){
      return this.$route.params.aid;
    }
  }
}
</script>

<style scoped>
.main{
  margin-top: 100px;
}
</style>
