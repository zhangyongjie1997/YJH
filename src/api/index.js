import axios from 'axios';
//axios.defaults.baseURL = 'http://vue.tyqprivateweb.cn:35002/vue';

export let Login = (username, password) => {
  return axios.post(`http://vue.tyqprivateweb.cn:35002/vue/login.php?username=${username}&password=${password}&timestep=${Date.parse(new Date())}&random=${parseInt(Math.random()*100)}`);
};
export let Register = (data) => {
  return axios.post('http://vue.tyqprivateweb.cn:35002/vue/is_register.php', data);
};
export let getArticles = (kind) => {
  return axios.get(`http://vue.tyqprivateweb.cn:35002/vue/article.php?event=selectArticleList&kind=${kind}&timestep=${Date.parse(new Date())}&random=${parseInt(Math.random()*100)}`);
};
export let addArticle = (data) => {
  return axios.post('http://vue.tyqprivateweb.cn:35002/vue/article.php', data);
};
export let getLocal = () => {
  return axios.get('../static/articles.json');
};
