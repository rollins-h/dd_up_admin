<template>
    <div class="app-container">
        <el-card class="box-card" style="width:500px;">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名称" prop="customerId">
                <el-select style="width:300px;" v-model="form.customerId" filterable placeholder="请选择">
                    <el-option
                    v-for="item in customers"
                    :key="item.id"
                    :label="item.nickName"
                    :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="积分值" label-width="80px">
                <el-input-number
                    :min="0"
                    v-model="form.value"
                    controls-position="right"
                />
            </el-form-item>
            <el-form-item label="备注" prop="content">
                <el-input
                    type="textarea"
                    :rows="2"
                    style="width:300px;"
                    placeholder="请输入内容"
                    v-model="form.content">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="submitForm('form')">提交</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
        </el-card>
    </div>
</template>
<script>
    import point from '@/api/point/point'
    import customer from '@/api/customer/customer'

    export default{
        data(){
        return {
            form: {
                value:0,
                customerId:null,
                content:''
            },
            customers:[],
            value: '',
            options:[],
            rules: {
                customerId: [
                    { required: true, message: '请选择用户名称', trigger: 'change' }
                ],
                content: [
                    { required: true, message: '请填写备注', trigger: 'blur' }
                ]
            }
        }
    },
    created(){  //页面渲染之前执行，一般用于执行methods中的方法
        this.init();
    },
    methods:{
        init(){
            let customerId = this.$route.query.customerId
            if(customerId != undefined){
                this.form.customerId = customerId;
            }
            this.getCustomers();
        },

        getCustomers(){
            customer.getCustomers()
                .then(res => {
                    this.customers = res.data.customers;
                })
        },

        submitForm(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updateAccountBalance();
                    console.log(this.form);
                }
            });
        },

        updateAccountBalance(){
            point.updateAccountBalance(this.form)
                .then(res => {
                    if(res.success){
                        this.$message({
                            message: '积分充值成功',
                            type: 'success'
                        });
                        this.resetForm("form")
                    }else{
                        this.$message.error('积分充值失败');
                    }
                })
        },

        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.form.value = 0;
        }
    }
    }
</script>