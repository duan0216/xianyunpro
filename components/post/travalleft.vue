<template>
  <div class="travalInfo">
    <div class="grid-content bg-purple">
      <!-- 面包屑 写在本页-->
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
          <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 面包屑 写在本页-->
      <!-- 文章详情介绍 contentInfo-->
      <div class="contentInfo">
        <div class="contentInfos">
          <!-- 标题 -->
          <el-row>
            <el-col :span="24">
              <!-- 动态从后台获取数据 -->
              <h2>{{data.title}}</h2>
              <hr class="divider" />
            </el-col>
          </el-row>
          <!-- 时间和阅读量 -->
          <el-row type="flex" justify="space-around">
            <el-col :span="12">
              <div class="grid-content bg-purple"></div>
            </el-col>
            <el-col :span="12">
              <div>
                <el-row>
                  <el-col :span="18">
                    <span>攻略:</span>
                    <!-- 需要动态获取时间 -->
                    <span>2019-07-21 09:16</span>
                  </el-col>
                  <el-col :span="6">
                    <span>阅读:{{data.watch}}</span>
                    <!-- 需要动态获取阅读量 -->
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <!-- 文章内容 -->
          <el-row>
            <el-col>
              <!-- 动态从后台获取数据 -->
              <div ref="content" class="contentbox"></div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <!-- 文章详情介绍 contentInfo-->
    <!-- 点赞收藏 likeOperation(喜好操作)-->
    <div class="likeOperation">
      <div class="likeOperations">
        <!-- 评论 -->
        <div class="bigbox">
          <div class="iconbox">
            <i class="el-icon-edit-outline" style="color:skyblue;font-size:30px;"></i>
          </div>
          <div class="contentbox">
            <span>评论（100）</span>
          </div>
        </div>
        <!-- 收藏 -->
        <div class="bigbox">
          <div class="iconbox">
            <i class="el-icon-star-off" style="color:skyblue;font-size:30px;" @click="handlesoucang"></i>
          </div>
          <div class="contentbox">
            <span class="secondspan">收藏</span>
          </div>
        </div>
        <!-- 分享 -->
        <div class="bigbox">
          <div class="iconbox">
            <i class="el-icon-s-promotion" style="color:skyblue;font-size:30px;" @click="handlefenxiang "></i>
          </div>
          <div class="contentbox">
            <span class="thirdspan">分享</span>
          </div>
        </div>
        <!-- 点赞 -->
        <div class="bigbox">
          <div class="iconbox">
            <i class="el-icon-thumb" style="color:skyblue;font-size:30px;" @click="handledianzan"></i>
          </div>
          <div class="contentbox">
            <span>点赞（100）</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 点赞收藏 likeOperation(喜好操作)-->
    <!-- 评论 comments-->
    <div class="comments">
      <div class="comment_title">
        <span>评论</span>
      </div>
      <!-- 插入评论提交表单 -->
      <div class="submit">
        <!-- 封装到另一组件 -->
        <div class="inputbox">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
          <el-button type="primary" style="margin-left:600px" size="mini" plain class="submitBtn">回复</el-button>
        </div>
        <div class="uploadfile">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
        <!-- 提交组件结束 -->
      </div>
      <!-- 插入评论提交表单 -->
      <div class="commemtlist">
        <div  v-for="(item,index) in commentList " :key="index" style="border: 1px solid #ccc;">
          <commentinfo :data="item" />
        </div>
        
      </div>
      <!-- 分页 写在本页-->
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="1"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="1"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 评论 comments-->
  </div>
</template>

<script>
import commentinfo from '@/components/post/commentinfo'
import axios from 'axios'
export default {
  props: ["data"],
  components: {
    commentinfo
  },
  data() {
    return {
      // 输入框
      textarea: "",
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: false,
      commentList:[],
      currentIndex:0,
      pageSize:5,
      total:0
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(this.data)
      this.$refs.content.innerHTML = this.data.content;
    }, 2000);
      this.init()
  },
  methods: {
    // 文章点赞等方法
    handlesoucang(){
      this.$message.success("已收藏")
    },
    handlefenxiang(){
      this.$message.success("已分享")
    },
    handledianzan(){
      this.$message.success("已点赞")
    },
    // 分页功能
    handleSizeChange(val) {
      this.pageSize = val
      this.init()
    },
    handleCurrentChange(val) {
      this.currentIndex = val 
      this.init()

    },
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    init(){
      axios({
      url:'http://157.122.54.189:9095/posts/comments',
      params:{
        post:4,
        _start:this.currentIndex,
        _limit:this.pageSize
      }
    }).then(res=>{
      console.log(res)
      this.commentList = res.data.data
      this.total = res.data.total
    })
    }
  }
};
</script>
<style lang="less">
.travalInfo {
  .breadcrumb,
  .grid-content {
    margin: 20px 0;
  }
  .contentInfo {
    width: 100%;
    .contentInfo {
      .divider {
        color: #fff;
      }
    }
    .contentInfos {
      width: 100%;
      .contentbox {
        width: 100%;
        p {
          width: 100%;
          span {
            width: 100%;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
  .grid-content {
    box-sizing: border-box;
    padding: 0 5px;
  }
  .likeOperation {
    .likeOperations {
      width: 400px;
      height: 60px;
      margin: 0 auto;
      .bigbox {
        display: inline-block;
        height: 50%;
        width: 23%;
        .iconbox {
          height: 100%;
          width: 100%;
          position: relative;
          i {
            display: block;
            position: absolute;
            left: 33%;
            top: 0%;
          }
        }
        .contentbox {
          height: 100%;
          width: 100%;
          position: relative;
          span {
            display: block;
            position: absolute;
            left: 22%;
            top: 0%;
            font-size: 8px;
          }
          .secondspan,
          .thirdspan {
            display: block;
            position: absolute;
            left: 38%;
            top: 0%;
          }
        }
      }
    }
  }
  .comments {
    .uploadfile {
      margin-top: 20px;
    }
    .inputbox {
      position: relative;
      .submitBtn {
        position: absolute;
        right: 0;
        width: 50px;
        height: 30px;
        // background-color: rgb(28, 131, 216);
        border-radius: 5px;
        border: none;
        margin: 10px;
      }
    }
  }
}
</style>

