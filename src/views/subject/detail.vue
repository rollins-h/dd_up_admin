<template>
  <el-container>
    <el-header>
      
      
      <el-row :gutter="20">
        <el-col :span="12">{{ groupInfo.text }}</el-col>
        <el-col :span="6" :offset="6" class="return-btn"><el-button @click="previous" size="small">返回</el-button></el-col>
      </el-row>
    </el-header>
    <div>
      <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-input size="small" v-model="questionQuery.text" placeholder="名称" />
          </el-form-item>
          <el-form-item>
            <el-select size="small" clearable v-model="questionQuery.typeId" placeholder="请选择类型">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-button size="small" type="primary" icon="el-icon-search" @click="getList()"
            >查询</el-button
          >
          <router-link :to="{ path: '/question/form', query: { groupId: groupId}}">
            <el-button size="small" type="default">新增</el-button>
          </router-link>
          <el-button size="small" type="default" @click="clear()">清空</el-button>
        </el-form>

        <el-row class="table-header">
          <el-col :span="8">
            <strong>题目名称</strong>
          </el-col>
          <el-col :span="4">
            <strong>题目类型</strong>
          </el-col>
          <el-col :span="2">
            <strong>排序</strong>
          </el-col>
          <el-col :span="4">
            <strong>创建时间</strong>
          </el-col>
          <el-col :span="4">
            <strong>更新时间</strong>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-collapse accordion>
          <el-collapse-item v-for="(item, index) in list" :key="index">
            <template slot="title">
              <el-row>
                <el-col :span="8">
                  <div class="question-name">{{ item.text }}</div>
                </el-col>
                <el-col :span="4">
                  <div>{{ item.typeName }}</div>
                </el-col>
                <el-col :span="2">
                  <div>{{ item.top }}</div>
                </el-col>
                <el-col :span="4">
                  <div>{{ item.createdTime }}</div>
                </el-col>
                <el-col :span="4">
                  <div>{{ item.updatedTime }}</div>
                </el-col>
              </el-row>
            </template>
            <el-row :gutter="20">
              <el-col :span="12" :offset="6">
                <div>
                  <strong>{{ item.text }}</strong>
                </div>
                <div>
                  <ul>
                    <li v-for="(option, index1) in item.options" :key="index1">
                      {{ option }}
                    </li>
                  </ul>
                </div>
                <div><strong>答案：</strong>{{ item.answer }}</div>
                <div><strong>解析：</strong>{{ item.parse }}</div>
              </el-col>
              <el-col :span="6" align="right">
                <div class="link-spacing">
                  <router-link :to="{ path: '/question/form', query: { groupId: groupId,questionId:item.id}}">
                    <el-button type="primary" size="mini" icon="el-icon-edit"
                      >修改</el-button
                    >
                  </router-link>
                </div>
                <div>
                  <el-button
                    type="danger"
                    size="mini"
                    icon="el-icon-delete"
                    @click="removeDataById(item.id)"
                    >删除</el-button
                  >
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <el-pagination
          background
          :current-page="page"
          :page-size="limit"
          :total="total"
          style="padding: 30px 0; text-align: center"
          layout="total, prev, pager, next, jumper"
          @current-change="getList"
        />
      </div>
    </div>
  </el-container>
</template>

<script>
import subject from "@/api/subject/subject";
import question from "@/api/subject/question";
export default {
  data() {
    return {
      groupInfo: {
        text: "",
      },
      list: [],
      questionQuery: {},
      page: 1,
      limit: 5,
      total: 0, //总记录数
      typeList: [],
      demo: "<ul><li>123</li><li>456</li></ul>",
      groupId: 0,
    };
  },

  created() {
    //页面渲染之前执行，一般用于执行methods中的方法
    this.init();
  },
  methods: {
    init() {
      if (this.$route.params && this.$route.params.id) {
        this.groupId = this.$route.params.id;
        this.questionQuery.groupId = this.groupId;
        this.getSubjectById(this.groupId);
        this.getQuestionType();
        this.getList();
      }
    },

    getQuestionType() {
      question.getQuestionType().then((response) => {
        this.typeList = response.data.typeList;
      });
    },
    getList(page = 1) {
      this.page = page;
      question
        .getListPage(this.page, this.limit, this.questionQuery)
        .then((response) => {
          this.list = response.data.rows;
          this.total = response.data.total;
          console.log(this.list)
        }) //请求成功
        .catch((error) => {
          console.log(error);
        }); //请求失败
    },

    getSubjectById(id) {
      subject.getById(id).then((response) => {
        var questionGroup = response.data.item;
        this.groupInfo.text = questionGroup.text;
      });
    },
    removeDataById(id){
      this.$confirm("此操作将删除此条记录，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        question
          .deleteQuestionById(id)
          .then((response) => {
            this.$message({
              type: "success",
              message: "删除成功！",
            });
            this.getList();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    clear() {
      this.questionQuery = {
        groupId: this.groupId,
      };
      this.getList();
    },
    previous() {
      this.$router.push({ path: "/subject/list"});
    },
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 50px;
}
.table-header {
  margin-bottom: 15px;
}
.link-spacing{
  margin-bottom: 5px;
}
.return-btn{
  text-align: right;
}
.question-name{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
}
.question-name-col{
  width: 33%;
}
</style>