<template>
  <div class="app-container">
        <el-form label-width="130px">
            <el-form-item label="标题">
                <el-input v-model="guideForm.title"/>
            </el-form-item>
            <el-form-item label="内容">
                <el-input type="textarea" v-model="guideForm.content"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
            </el-form-item>
        </el-form>

  </div>
</template>

<script>
import guide from '@/api/guide/guide'

export default {
    data(){
        return {
            guideForm:{},
            saveBtnDisabled: false,
            BASE_API:process.env.BASE_API, //获取dev.env.js里面的地址
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
                this.getInfo(id)
            }else {
                this.guideForm = {}
            }
        },
        getInfo(id){
            guide.getById(id)
                .then(response => {
                    this.guideForm = response.data.item;
                })
        },
        saveOrUpdate(){
            this.guideForm.id ? this.updateGuide() : this.saveGuide();
            //回到列表页面
            this.$router.push({path:'/guide/list'});
        },
        updateGuide(){
            guide.updateGuide(this.guideForm)
                .then(response => {
                    this.$message({
                        type: 'success',
                        message: '修改成功！'
                    });
                })
        },
        saveGuide(){
            guide.addGuide(this.guideForm)
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