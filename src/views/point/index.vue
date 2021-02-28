    <template>
        <div class="app-container">
            <el-form :inline="true" class="demo-form-inline">
            <el-form-item>
                <el-input size="small" v-model="logQuery.name" placeholder="昵称"/>
            </el-form-item>
            <el-form-item>
                <el-select size="small" v-model="logQuery.typeId" placeholder="请选择类型">
                <el-option
                    v-for="item in typeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                </el-option>
                </el-select>
            </el-form-item>

            <el-button size="small" type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
            <el-button size="small" type="default" @click="clear()">清空</el-button>
            </el-form>

            <el-table
            :data="list"
            style="width: 100%">
            <el-table-column
                prop="customerName"
                label="用户昵称"
                width="180">
            </el-table-column>
            <el-table-column
                prop="typeName"
                label="积分类型"
                width="180">
            </el-table-column>
            <el-table-column
                prop="pointValue"
                label="积分值"
                width="120">
            </el-table-column>
            <el-table-column
                prop="intro"
                label="内容">
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间">
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
        import point from '@/api/point/point'
        export default{
            data(){
                return {
                    page: 1,
                    limit: 10,
                    total: 0,  //总记录数
                    logQuery: {},
                    list: [], //查询后的接口返回值
                    typeList:[],
                }
            },
            created(){  //页面渲染之前执行，一般用于执行methods中的方法
                this.getList()
            },
            methods:{
                getList(page = 1){
                    this.page = page;
                    point.getPointLogList(this.page,this.limit,this.logQuery)
                    .then(response => {
                        this.list = response.data.list;
                        this.total = response.data.total;
                        this.typeList = response.data.types;
                    })  //请求成功
                    .catch(error => {
                        console.log(error);
                    })  //请求失败
                },
                clear(){
                    this.logQuery = {};
                    this.getList();
                },
            }
        }
    </script>