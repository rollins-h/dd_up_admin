  <template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input size="small" v-model="guideQuery.title" placeholder="标题"/>
      </el-form-item>

      <el-button size="small" type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button size="small" type="default" @click="clear()">清空</el-button>
      <router-link :to="'/guide/form'">
        <el-button size="small" type="default" >新增</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="title"
        label="标题"
        width="180">
      </el-table-column>

      <el-table-column
        prop="content"
        label="内容">
      </el-table-column>

      <el-table-column
        prop="createdAt"
        label="创建时间">
      </el-table-column>

      <el-table-column
        prop="updatedAt"
        label="更新时间">
      </el-table-column>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/guide/form/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除</el-button>
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
import guide from '@/api/guide/guide'

export default {
    data(){
        return {
            page: 1,
            limit: 10,
            total: 0,  //总记录数
            guideQuery: {},
            list: [], //查询后的接口返回值
        }
    },
    created(){  //页面渲染之前执行，一般用于执行methods中的方法
        this.getList();
    },
    methods:{
        getList(page = 1){
            this.page = page;
            guide.getGuideList(this.page,this.limit,this.guideQuery)
            .then(response => {
                console.log(response)
                this.list = response.data.list;
                this.total = response.data.total;
            })  //请求成功
            .catch(error => {
                console.log(error);
            })  //请求失败
        },

        removeDataById(id){
            this.$confirm("此操作将永久删除条目，是否继续？","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }).then(() => {
                guide.removeById(id)
                    .then(response => {
                        this.$message({
                            type:"success",
                            message:"删除成功！"
                        });
                        this.getList()
                    })
                    .catch(error => {
                      this.$message.error(error.message);
                    })
            })
            
        },
        clear(){
          this.guideQuery = {};
          this.getList();
        }
    }
}
</script>