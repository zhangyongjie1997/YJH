import axios from 'axios';
//axios.defaults.baseURL = 'http://vue.tyqprivateweb.cn:35002/vue';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
//{headers:{'Content-Type':'application/json'}}


export let getUser = () => {
  return JSON.parse(localStorage.loginMsg);
};

//登录
export let Login = (username, password) => {
  let data = {mobile:username,pwd:password};
  return axios.post(`http://www.ftusix.com/static/data/login.php`,data);
};
//注册
export let Register = ({mobile,pwd,sms_code}) => {
  let data = {mobile,pwd,sms_code};
  return axios.post('http://www.ftusix.com/static/data/register.php', data);
};
//重置密码
export let Reset = (data) => {
  return axios.get('http://www.ftusix.com/static/data/reset.php', data);
};
export let Update = (data) => {
  return axios.post('http://www.ftusix.com/static/data/update.php', data);
};
//获取文章
export let getArticles = (type=0,sort,page=1,index=true) => {
  return axios.post(`http://www.ftusix.com/static/data/topicList.php?type=${type}&sort=${sort}&page=${page}&index=${index}`);
};
//我的帖子
export let getMyNote = (data) => {
  return axios.get(`http://www.ftusix.com/static/data/myNote.php?user_id=${data.user_id}&page=${data.page}`);
};
//个人收藏
export let getCol = (user_id,page) => {
  return axios.post(`http://www.ftusix.com/static/data/myColl.php?user_id=${user_id}&page=${page}`);
};
//获取本地的json文件
export let getLocal = () => {
  return axios.get('../static/articles.json');
};
//获取短信验证码
export let getCode = (data) => {
  return axios.get('http://yjh.li-shang-bin.com/iweb/Sendsms/send',data);
};
export let getOne = (user_id,topic_id) => {
  return axios.get(`http://www.ftusix.com/static/data/content.php?user_id=${user_id}&topic_id=${topic_id}`);
};
//发布文章
export let writeArticle = (data) => {
  return axios.post('http://www.ftusix.com/static/data/writeArticle.php',data);
};

//点赞
export let zan_coll = (data)=>{
  return axios.post('http://www.ftusix.com/static/data/zan.php',data);
};
//删除我的帖子
export let removeNote = (data)=>{
  return axios.post('http://www.ftusix.com/static/data/delete.php',data);
};

//发布评论
export let sendComment = (data) => {
  return axios.post('http://www.ftusix.com/static/data/comment.php',data);
};
//获取评论
export let getComment = (topic_id) => {
  return axios.post(`http://www.ftusix.com/static/data/commentList.php?topic_id=${topic_id}`);
};
