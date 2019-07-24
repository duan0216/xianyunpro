<template>
  <section class="contianer">
    <!-- 中间内容的所有部分，左边加右边，设置为flex布局 -->
    <el-row type="flex" justify="space-between">
      <!-- 中间部分 -->
      <div class="main">
        <!-- 上面发表新攻略部分 -->
        <!-- 文字部分 -->
        <h2>发表新攻略</h2>
        <p>分享你的个人游记，让更多人看到哦</p>
        <!-- 这里的内容需要后期提交的，所以要用form表单的元素 -->
        <el-form>
          <!-- 输入框部分 -->
          <el-form-item class="title">
            <el-input placeholder="请输入标题" v-model="form.title"></el-input>
          </el-form-item>
          <!-- 富文本框部分 -->
          <div id="app" style="height:472px">
            <VueEditor :config="config" style="height:400px" ref="vueEditor" />
          </div>

          <!-- 选择城市 -->
          <!-- <div class="selectCity"> -->
          <el-form-item label="选择城市" :label-width="'70px'" class="city">
            <!-- fetch-suggestions:远程获取数据建议，
            输入框的值发生改变的时候触发-->
            <!-- select：选中下拉框的选项的时候触发 -->
            <el-autocomplete
              v-model="form.city"
              :fetch-suggestions="queryCityAsync"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <!-- </div> -->

          <!-- 发布按钮和保存到草稿箱 -->
          <div class="publish">
            <el-button type="primary" size="small" @click="PublishArticle">发布</el-button>
            <span class="submitSide">
              &nbsp;&nbsp;或者
              <nuxt-link to="#" @click.native="SaveDrafts">保存到草稿</nuxt-link>
              <el-button type="info" size="small" style="float: right"  @click="delArticle">清空文本框</el-button>
            </span>
          </div>
        </el-form>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <div class="aside">
          <div class="history">
            <h5>草稿箱 ({{allHistory.length}})</h5>
            <nuxt-link
              to="#"
              v-for="(item,index) in allHistory"
              :key="index"
              @click.native="editeDrafts(item)"
            >
              <el-row type="flex" justify="space-between" align="middle" class="history-item">
                <div class="air-info">
                  <div class="to-from">
                    {{item.title}}
                    <span class="el-icon-edit"></span>
                  </div>
                  <p>{{item.time}}</p>
                </div>
              </el-row>
            </nuxt-link>
          </div>
        </div>
      </div>
    </el-row>
  </section>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;
if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  name: "app",
  data() {
    return {
      // 富文本的数据
      config: {
        modules: {
          // 工具栏
          toolbar: [
            ["bold", "italic", "underline", "strike"], // toggled buttons
            ["blockquote", "code-block"],
            ["image", "video"],

            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ script: "sub" }, { script: "super" }], // superscript/subscript
            [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
            [{ direction: "rtl" }] // text direction
          ]
        },
        // 主题
        theme: "snow",
        uploadImage: {
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {},
          showProgress: false
        },

        uploadVideo: {
          //url: "http://157.122.54.189:9095/upload",
          url: "http://localhost:1337/upload",
          name: "files",
          uploadBefore(file) {
            return true;
          },
          uploadProgress(res) {},
          uploadSuccess(res, insert) {
            insert("http://localhost:1337" + res.data[0].url);
          },
          uploadError() {}
        }
      },
      // 发布的时候需要的数据
      form: {
        title: "",
        content: "",
        city: ""
      },
      // 准备渲染在草稿箱的数据,定义一个对象数据，有时间，标题，内容，城市，显示在页面上的是时间和标题

      // 需要放在数组里面的对象数据
      history: {
        title: "",
        content: "",
        city: "",
        time: ""
      },
      allHistory: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
    // 点击发布按钮
    PublishArticle() {
      // 准备发送回后台的数据

      // console.log( this.$refs.vueEditor.editor.root.innerHTML)
      this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      // console.log(this.form.content);
      // 验证表单非空
      // 准备一个对象，里面就是我们需要判断的数据
      // console.log(123);
      const rules = {
        title: {
          value: this.form.title,
          message: "请填写标题"
        },
        content: {
          value: this.form.content,
          message: "请填写需要发布的内容"
        },
        city: {
          value: this.form.city,
          message: "请选择城市"
        }
      };
      // 准备一个开关，用于控制循环的开启和关闭
      let valid = true;
      // 循环判断上面的字段是否为空
      Object.keys(rules).forEach(v => {
        // 判断只要有一次为空，不会执行循环
        if (!valid) return;
        // 判断字段是否为空
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
        }
      });
      // console.log(this.form)

      // const token=this.$store.state.user.userInfo.token;
      // 发起请求，添加文章
      this.$axios({
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        },
        url: "/posts",
        method: "POST",
        data: this.form
        //  headers: {
        //             // token规范来自于JWT
        //             Authorization: `Bearer ${ this.$store.state.user.userInfo.token }`
        //         }
      }).then(res => {
        // console.log(res)
        this.$message.success(res.data.message);
      });
    },

    // 获取远程搜索建议,输入框的值发生改变的时候触发
    // value:输入框的值
    // cb：回调函数，这个函数必须要调用
    // cb必须是一个数组，数组中每一项必须是一个对象
    queryCityAsync(value, cb) {
      // 当输入框没有值的时候，下拉框为空
      if (!value) {
        cb([]);
        return;
      }

      // 请求推荐城市列表
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        // console.log(res);
        const { data } = res.data;
        // console.log(data)
        // console.log(NewData)
        // 给数组中的对象添加city
        const newData = data.map(v => {
          v.value = v.name;
          return v;
        });
        console.log(newData);
        // console.log(NewData)
        cb(newData);
        // 默认选择第一个
        this.form.city = newData[0].value;
      });
    },
    // 下拉框选择的时候触发
    handleSelect(item) {
      this.form.city = item.value;
    },
    // 保存数据到草稿箱
    SaveDrafts() {
      //  this.his.content =
      //  console.log( this.form.content)
      // console.log(123);
      // 获取添加文件到草稿箱的时间
      const data = new Date();
      const year = data.getFullYear();
      const month = data.getMonth() + 1;
      const day = data.getDate();

      const currentDate = year + "-" + month + "-" + day;

      // console.log(currentDate);

      // 把当前数据存储在草稿箱
      this.history.title = this.form.title;
      this.history.content = this.$refs.vueEditor.editor.root.innerHTML;
      this.history.city = this.form.city;
      this.history.time = currentDate;
      // console.log(this.history)
      // 把新增的数据放在构建的数组的最前面
      // 因为数据需要一直存在，所以需要把数据放在本地存储里面，那样刷新页面的时候，数据也是存在的
      // 把数据从本地存储里面拿出来，才能进行操作
      const airs = JSON.parse(localStorage.getItem("airs")) || [];
      // 把当前的数据放在数组数据里面的前面
      airs.unshift(this.history);
      // 截取5条数据显示在页面上
      if (airs.length > 5) {
        airs.length = 5;
      }
      // 把完善好的数组数据存储在本地
      localStorage.setItem("airs", JSON.stringify(airs));
      // 取数据
      this.allHistory = JSON.parse(localStorage.getItem("airs")) || [];
      console.log(this.allHistory);
      // console.log;
    },
    // 点击草稿箱进行编辑
    editeDrafts(item) {
      console.log(item);
      // this.allHistory = JSON.parse(localStorage.getItem("airs")) || [];
      this.form.title = item.title;
      this.form.content = item.content;
      // console.log( this.form.content)
      this.$refs.vueEditor.editor.root.innerHTML = item.content;
      this.form.city = item.city;
    },
    // 清空文本框
    delArticle() {
      this.form.title = "";
      this.form.content = "";
      // console.log( this.form.content)
      this.$refs.vueEditor.editor.root.innerHTML = "";
      this.form.city = "";
    }
  },
  mounted() {
    this.allHistory = JSON.parse(localStorage.getItem("airs")) || [];
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
.main {
  h2 {
    font-weight: 400;
    font-size: 22px;
    margin-bottom: 10px;
  }
  p {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .title {
    width: 750px;
  }
  .city {
    width: 276px;
    padding: 0, 15px;
  }
  span a {
    // text-decoration: none;
    cursor: pointer;
    font-size: 14px;
    color: rgb(255, 165, 0);

    &:hover {
      text-decoration: underline;
      text-decoration-style: initial;
      text-decoration-color: initial;
    }
  }
}
.statement {
  border: 1px #ddd solid;

  .statement-list {
    padding: 10px 0;
    > div {
      text-align: center;
      i {
        display: block;
        font-size: 40px;
      }
      span {
        font-size: 12px;
      }
    }
  }
  .service-tel {
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    background: #f6f6f6;
    font-size: 14px;
  }
}

.history {
  border: 1px #ddd solid;
  padding: 10px;
  margin-top: 10px;

  h5 {
    font-size: 16px;
    font-weight: normal;
    padding-bottom: 10px;
    border-bottom: 1px #eee solid;
  }

  .history-item {
    padding: 10px 0;
    font-size: 14px;
    border-bottom: 1px #eee solid;

    &:last-child {
      border: none;
    }

    .to-from {
      margin-bottom: 5px;
    }

    p {
      font-size: 12px;
      color: #666;
    }
  }
}
</style>