<template>
  <div>
    <Top></Top>
    <div class="editor">
      <div class="select">
        <el-row :gutter="20">
          <el-col :span="8">
            <div>文章标题</div>
            <el-input v-model="article.name"
                      placeholder="请输入标题"></el-input>
          </el-col>
          <el-col :span="8">
            <div>所属分类</div>
            <el-select v-model="article.kind"
                       placeholder="请选择">
              <el-option v-for="item in options"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <div>技术分类</div>
            <el-select v-model="article.kind2"
                       placeholder="请选择">
              <el-option v-for="item in options2"
                         :key="item.value2"
                         :label="item.label2"
                         :value="item.value2">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="content-editor"><quillEditor v-model="article.content"></quillEditor></div>
      <div class="btn">
        <el-button @click="submit" class="submit" type="danger" plain>发布</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Top from '../base/Top.vue';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import {addArticle,getLocal} from '../api/index.js';
export default {
  data() {
    return {
     options: [{
          value: '经验分享',
          label: '经验分享'
        }, {
          value: '入门学习',
          label: '入门学习'
        }, {
          value: '成果分享',
          label: '成果分享'
        }],
     options2: [{
          value2: 'html',
          label2: 'html'
        }, {
          value2: 'php',
          label2: 'php'
        }, {
          value2: 'java',
          label: 'java'
        }],
        content:'',
        article:{}
    }
  },
  created(){
    if(localStorage.loginMsg != ''){this.$store.commit('loginMutation',true);}
    if(this.$route.params.aid){this.getArticle();}
  },
  components: {
    Top,quillEditor
  },
  computed:{
    id(){return this.$route.params.aid;}
  },
  methods:{
    async submit(){
      let data = {
        userId:JSON.parse(sessionStorage.loginMsg).userId,
        content:this.content,
        event:"addArticle",
        kind:this.value2,
        timestep:Date.parse(new Date()),
        random:parseInt(Math.random()*100),
        signure:"a846837397832791c7a5"
      };
     let res = await addArticle();
    },
    async getArticle(){
      let res = await getLocal();
      this.article = res.data.filter(item=>item.id==this.id)[0];
    }
  }
}
</script>

<style scoped lang="less">
.select {
  padding: 20px;
  margin-bottom: 10px;
}
.content-editor{
  margin-bottom: 20px;
}
.editor {
  width: 70%;
  margin: 0 auto;
  height: 1000px;
  margin-top: 100px;
}
.btn{
  clear: both;
  .submit{
    float: right;
  }
}
</style>
