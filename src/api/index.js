import axios from 'axios';
//axios.defaults.baseURL = 'http://vue.tyqprivateweb.cn:35002/vue';
axios.defaults.headers['Content-Type'] = 'application/json';
//登录
export let Login = (username, password) => {
  return axios.get(`http://yjh.li-shang-bin.com/iweb/login/check?mobile=${username}&pwd=${password}`);
};
//注册
export let Register = ({
    mobile,
    pwd,
    sms_code,
    openid="",
    access_token="",
    unionid=""
}) => {
  let data = {
    mobile:mobile,
    pwd:pwd,
    sms_code:sms_code,
    openid:openid,
    access_token:access_token,
    unionid:unionid
  };
  return axios.get('http://yjh.li-shang-bin.com/iweb/regist/index', data);
};
//重置密码
export let Reset = (data) => {
  return axios.get('http://yjh.li-shang-bin.com/iweb/Forgetpwd/reset', data);
};
export let Update = (data) => {
  return axios.post('http://www.ftusix.com/static/data/update.php', data);
};
//获取文章页
export let getArticles = (page,{
  user_id,token
}) => {
  let data = {user_id:user_id,token:token};
  axios.interceptors.request.use((config) => {
    console.log(config);
    return config;
  }, (err) => {
      return Promise.reject(err);
  });
  return axios.get(`http://yjh.li-shang-bin.com/iweb/topic/myTopicList?page=${page}`,data);
};
export let addArticle = (data) => {
  return axios.post('http://vue.tyqprivateweb.cn:35002/vue/article.php', data);
};
//首页hot
export let getHot = () => {
  return axios.post('http://yjh.li-shang-bin.com/iweb/topic/topicList?par=index_hot');
};
//首页html
export let getHtml = () => {
  return axios.post('http://yjh.li-shang-bin.com/iweb/topic/topicList?par=&tech_type=1');
};
//个人收藏
export let getCol = () => {
  return axios.post({
    method:'post',
    baseURL:'/api',
    url:'/collect/myCollect',
    data:{
      page:1,
      user_id:"user8",
      token:"5c62dcb16e33b0f16c075627cbcc15dd"
    }
  });
};
//获取本地的json文件
export let getLocal = () => {
  return axios.get('../static/articles.json');
};
//获取短信验证码
export let getCode = (data) => {
  return axios.get('http://yjh.li-shang-bin.com/iweb/Sendsms/send',data);
};
export let getOne = (id) => {
  axios.get('../static/articles.json').then(
    res => {
      console.log(this);
    }
  );
};

