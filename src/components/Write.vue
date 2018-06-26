<template>
  <div>
    <Top></Top>
    <goLogin @odialogvisiblechange="dialogVisibleChange" :odialogVisible="dialogVisible" @onsuccess="loginSuccess"></goLogin>
    <div class="editor">
      <div class="select">
        <el-row :gutter="20">
          <el-col :span="8">
            <div>文章标题</div>
            <el-input v-model="article.title" placeholder="请输入标题"></el-input>
          </el-col>
          <el-col :span="8">
            <div>所属分类</div>
            <el-select v-model="article.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <div>技术分类</div>
            <el-select v-model="article.tech_type" placeholder="请选择">
              <el-option v-for="item in options2" :key="item.value2" :label="item.label2" :value="item.value2">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      <div class="content-editor">
        <quillEditor v-model="article.content"></quillEditor>
      </div>
      <div class="btn">
        <el-button :disabled="btnDisabled" @click="submit" class="submit" type="danger" plain>{{btnMsg}}</el-button>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import goLogin from '../base/goLogin.vue';
  import Top from '../base/Top.vue';
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import {
    quillEditor
  } from 'vue-quill-editor';
  import {
    getLocal,
    writeArticle,
    getOne,
    getUser
  } from '../api/index.js';
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '经验分享'
        }, {
          value: '2',
          label: '入门学习'
        }, {
          value: '3',
          label: '成果分享'
        }],
        options2: [{
          value2: '1',
          label2: 'html'
        }, {
          value2: '2',
          label2: 'php'
        }, {
          value2: '3',
          label2: 'java'
        }],
        article: {
          topic_id: "",
          title: "",
          modify_time: "",
          browser_num: "",
          content: "",
          md_content: "",
          type: "",
          tech_type: "",
          like_num: "",
          comment_num: "",
          coll_num: "",
          user_id: "",
          nick_name: ""
        },
        title: '',
        kind1: '',
        kind2: '',
        isEdit: false,
        userMsg: {},
        dialogVisible: false,
        btnDisabled: true,
        btnMsg: '内容不能为空'
      }
    },
    created() {
      if (localStorage.loginMsg) {
        this.$store.commit('loginMutation', true);
        this.userMsg = getUser();
      }
      if (this.$route.params.aid) { //判断是否为编辑模式，传参就是编辑模式
        this.isEdit = true;
        this.getArticle(this.$route.params.aid);
      }
    },
    components: {
      Top,
      quillEditor,
      goLogin
    },
    computed: {
      id() {
        return this.$route.params.aid;
      },
      ifLogin() {
        return this.$store.state.ifLogin;
      }
    },
    watch: {
      article: {
        handler() {
          if (this.article.content == '') {
            this.btnMsg = '内容不能为空';
            this.btnDisabled = true;
          } else {
            this.btnMsg = '发布';
            this.btnDisabled = false;
          }
        },
        deep: true
      }
    },
    methods: {
      loginSuccess() {
        this.userMsg = getUser();
      },
      dialogVisibleChange(val) {
        this.dialogVisible = val;
      },
      async submit() { //提交文章
        if (this.ifLogin == false) {
          return this.dialogVisible = true;
        }
        let data = {
          content: this.article.content,
          md_content: this.article.content,
          user_id: this.userMsg.user_id,
          nickname: this.userMsg.nick_name,
          type: this.article.type == "" ? "0" : this.article.type,
          tech_type: this.article.tech_type == "" ? "0" : this.article.tech_type,
          title: this.article.title,
          isEdit: this.isEdit,
          topic_id: this.article.topic_id
        };
        let res = await writeArticle(data);
        if (res.data.status == 1) {
          this.$message.success(res.data.info);
          this.$router.push('/personal');
        } else {
          this.$message.error('上传失败');
        }
      },
      async getArticle(topic_id) { //编辑模式下获取文章内容
        let res = await getOne(this.userMsg.user_id, topic_id);
        console.log(res);
        this.article = res.data.data;
        this.kind1 = this.article.type;
        this.kind2 = this.article.tech_type;
        this.title = this.article.title;
        this.content = this.article.content;
      }
    },
  }

</script>

<style scoped lang="less">
  .select {
    padding: 20px;
    margin-bottom: 10px;
  }

  .content-editor {
    margin-bottom: 20px;
  }

  .editor {
    width: 70%;
    margin: 0 auto;
    height: 1000px;
    margin-top: 100px;
  }

  .btn {
    clear: both;
    .submit {
      float: right;
    }
  }

</style>
