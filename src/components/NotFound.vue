<template>
  <div class="main">
    <div class="content">
      <div class="info">
        页面找不到了...
      </div>
      <div class="photo">
        <img src="https://a0.muscache.com/airbnb/static/error_pages/404-Airbnb_final-d652ff855b1335dd3eedc3baa8dc8b69.gif" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {

    }
  },
  components: {

  }
}
</script>

<style scoped>
.main{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99999;
  background-color: #fff;
}
.content{
  width: 65%;
  margin: 100px auto 100px auto;
  height: 500px;
  position: relative;
}
.info{
  width: 65%;
  font-size: 80px;
  text-align: center;
  position: absolute;
  top: 150px;
  left: 50px;
  color: #aaa;
}
.photo{
  position: absolute;
  right: 0;
}
</style>
