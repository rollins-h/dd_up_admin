<template>
  <div class="app-container">
    <el-form
      :model="questionForm"
      ref="questionForm"
      label-width="100px"
      class="demo-dynamic"
    >
      <el-row>
        <el-col :span="12">
          <el-form-item prop="text" label="题干">
            <el-input size="small" v-model="questionForm.text"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="题目类型">
            <el-select :disabled="isUpdate"
              clearable
              size="small"
              v-model="questionForm.typeId"
              placeholder="请选择类型"
              @change="typeChange"
            >
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <div v-if="questionForm.typeId != 3">
        <el-row :gutter="10">
          <el-form-item
            v-for="(option, index) in questionForm.children"
            :label="'选项' + (index + 1)"
            :key="option.key"
            :prop="'children.' + index + '.text'"
          >
            <el-col :span="10">
              <el-input size="small" v-model="option.text"></el-input>
            </el-col>
            <el-col :span="2">
              <el-button v-if="!isUpdate" size="small" @click.prevent="removeOption(option)"
                >删除</el-button
              >
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-col>
            <el-form-item label="正确选项">
                <el-checkbox-group v-if="questionForm.typeId == 2" v-model="questionForm.answer">
                  <el-checkbox v-for="(item,index) in questionForm.children" :key="index" :label="item.text" name="answer"></el-checkbox>
                </el-checkbox-group>
                <el-radio-group v-if="questionForm.typeId == 1" v-model="questionForm.answer[0]">
                  <el-radio v-for="(item,index) in questionForm.children" :key="index" :label="item.text"></el-radio>
                </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="答案解析" prop="desc">
              <el-input type="textarea" v-model="questionForm.parse"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('questionForm')"
            >提交</el-button
          >
          <el-button v-if="!isUpdate" @click="addOption" size="small">添加选项</el-button>
          <el-button @click="resetForm('questionForm')" size="small">重置</el-button>
          <el-button @click="previous" size="small">返回</el-button>
        </el-form-item>
      </div>

      <div v-if="questionForm.typeId == 3">
        <el-row>
          <el-col :span="12">
            <el-form-item label="答案" prop="desc">
              <el-input type="textarea" v-model="questionForm.customData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="答案解析" prop="desc">
              <el-input type="textarea" v-model="questionForm.parse"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('questionForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('questionForm')" size="small">重置</el-button>
          <el-button @click="previous" size="small">返回</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import question from "@/api/subject/question";
export default {
  data() {
    return {
      questionForm: {
        text: "",
        typeId:"",
        answer:[],
        parse:"",
        children: [
          {
            optionId:0,
            text: "",
          },
        ],
      },
      typeList: [],
      isUpdate:false,
      questionId:0,
      groupId:0,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.$route.query && this.$route.query.groupId) {
        this.questionForm.groupId = this.$route.query.groupId;
        this.groupId = this.$route.query.groupId;
        if(this.$route.query.questionId){
          this.questionForm.id = this.$route.query.questionId;
          this.questionId = this.$route.query.questionId;
          this.isUpdate = true
          this.getQuestionById();
        }
        this.getQuestionType();
        console.log(this.questionForm);
      }
    },
    getQuestionById() {
      question.getQuestionById(this.questionId).then((response) => {
        this.questionForm = response.data.item;
      });
    },
    getQuestionType() {
      question.getQuestionType(this.questionForm.id).then((response) => {
        this.typeList = response.data.typeList;
      });
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.questionId ? this.updateQuestion() : this.addQuestion();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updateQuestion(){
      question.updateQuestion(this.questionForm).then((response) => {
        this.$message({
          type: "success",
          message: "问题更新成功！",
        });
        this.$router.push({
          path: `/subject/detail/${this.groupId}`,
        });
      });
    },
    addQuestion(){
      question.addQuestion(this.questionForm).then((response) => {
        this.$message({
          type: "success",
          message: "问题添加成功！",
        });
        this.$router.push({
          path: `/subject/detail/${this.groupId}`,
        });
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.questionForm.parse = ""
      this.questionForm.typeId = ""
    },
    removeOption(item) {
      var index = this.questionForm.children.indexOf(item);
      if (index !== -1) {
          this.questionForm.children.splice(index, 1);
      }
    },
    addOption() {
      this.questionForm.children.push({
        text: "",
        key: Date.now()
      });
    },
    typeChange(){
        this.questionForm.answer = []
    },
    previous() {
      this.$router.push({ path: `/subject/detail/${this.groupId}`});
    },
  },
};
</script>