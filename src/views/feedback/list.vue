    <template>
        <div class="app-container">
            <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="name"
                label="用户昵称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="telephone"
                label="手机号"
                width="180">
            </el-table-column>
            <el-table-column
                prop="content"
                label="反馈内容">
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="反馈时间">
            </el-table-column>
            </el-table>

            <el-pagination
            background
            :current-page="page"
            :page-size="limit"
            :total="total"
            style="padding: 30px 0; text-align: center;"
            layout="total, prev, pager, next, jumper"
            @current-change="getList"
            />
        </div>
    </template>

    <script>
        import feedback from '@/api/feedback/feedback'
        export default{
            data(){
                return {
                    page: 1,
                    limit: 10,
                    total: 0,  //总记录数
                    list: [], //查询后的接口返回值
                }
            },
            created(){  //页面渲染之前执行，一般用于执行methods中的方法
                this.getList()
            },
            methods:{
                getList(page = 1){
                    this.page = page;
                    feedback.getFeedbackList(this.page,this.limit)
                    .then(response => {
                        this.list = response.data.list;
                        this.total = response.data.total;
                    })  //请求成功
                    .catch(error => {
                        console.log(error);
                    })  //请求失败
                },
                clear(){
                    this.getList();
                },
            }
        }
    </script>