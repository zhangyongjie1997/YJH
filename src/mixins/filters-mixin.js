export default {
  filters:{
    getTime(val) { //传入事件戳返回本地时间
      return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    }
  }
}