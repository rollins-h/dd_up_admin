<template>
  <div class="app-container">
     <el-form label-width="130px">
      <el-form-item label="分组名称">
        <el-input v-model="subjectGroup.text"/>
      </el-form-item>
    <el-form-item label="分组类型">
        <el-select v-model="subjectGroup.typeId" placeholder="请选择">
        <el-option
        v-for="item in enumList"
        :key="item.id"
        :label="item.name"
        :value="item.id">
        </el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="答题时间（分钟）">
        <el-input-number v-model="subjectGroup.time" controls-position="right" min="0"/>
      </el-form-item>
      <el-form-item label="分组排序">
        <el-input-number v-model="subjectGroup.top" controls-position="right" min="0"/>
      </el-form-item>


      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import subject from '@/api/subject/subject'

export default {
    data(){
        return {
            subjectGroup:{},
            saveBtnDisabled: false,
            BASE_API:process.env.BASE_API, //获取dev.env.js里面的地址
            enumList:[],
        }
    },
    created(){
        this.init();
    },
    watch: {
        $route(to, from){
            this.init();
        }
    },
    methods:{
        init(){
            if(this.$route.params && this.$route.params.id){
                const id = this.$route.params.id;
                this.getnfo(id)
            }else {
                this.subjectGroup = {}
            }

            subject.getEnumList()
                .then(response => {
                    this.enumList = response.data.list;
                })

        },
        getnfo(id){
            subject.getById(id)
                .then(response => {
                    this.subjectGroup = response.data.item;
                })
        },
         saveOrUpdate(){
            this.subjectGroup.id ? this.updateSubject() : this.saveSubject();
            //回到列表页面
            this.$router.push({path:'/subject/list'});
        },
        updateSubject(){
            subject.updateSubject(this.subjectGroup)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                })
        },
        saveSubject(){
            subject.addSubject(this.subjectGroup)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '添加成功！'
                    });
                })
        }
    }
    
}
</script>