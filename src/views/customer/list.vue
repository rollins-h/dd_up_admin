  <template>
    <div class="app-container">
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
            <el-input size="small" v-model="customerQuery.nickName" placeholder="昵称"/>
        </el-form-item>

        <el-button size="small" type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
        <el-button size="small" type="default" @click="clear()">清空</el-button>
        </el-form>

        <el-table
        :data="list"
        style="width: 100%">
        <el-table-column
            prop="nickName"
            label="昵称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="genderName"
            label="性别"
            width="180">
        </el-table-column>
        <el-table-column
            prop="cityName"
            label="地址">
        </el-table-column>
        <el-table-column
            prop="pointBalance"
            label="积分余额"
            width="180">
        </el-table-column>
        <el-table-column
            prop="createdAt"
            label="创建时间">
        </el-table-column>

        <el-table-column label="操作" width="300" align="center">
            <template slot-scope="scope">
            <router-link :to="{path:'/point/add',query: {customerId: scope.row.id}}">
                <el-button type="primary" size="mini">积分充值</el-button>
            </router-link>
            </template>
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
      import customer from '@/api/customer/customer'
      export default{
          data(){
            return {
                page: 1,
                limit: 10,
                total: 0,  //总记录数
                customerQuery: {},
                list: [], //查询后的接口返回值
            }
        },
        created(){  //页面渲染之前执行，一般用于执行methods中的方法
            this.getList()
        },
        methods:{
            getList(page = 1){
                this.page = page;
                customer.getCustomerList(this.page,this.limit,this.customerQuery)
                .then(response => {
                    console.log(response);
                    this.list = response.data.list;
                    this.total = response.data.total;
                })  //请求成功
                .catch(error => {
                    console.log(error);
                })  //请求失败
            },
            clear(){
                this.customerQuery = {};
                this.getList();
            },
        }
      }
  </script>