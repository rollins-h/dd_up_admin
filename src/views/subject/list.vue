  <template>
  <div class="app-container">

    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input size="small" v-model="groupQuery.text" placeholder="名称"/>
      </el-form-item>
      <el-form-item>
        <el-select size="small" v-model="groupQuery.typeId" placeholder="请选择类型">
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
      <router-link :to="'/subject/form'">
        <el-button size="small" type="default" >新增</el-button>
      </router-link>
    </el-form>

    <el-table
      :data="list"
      style="width: 100%">
      <el-table-column
        prop="text"
        label="分组名称"
        width="180">
      </el-table-column>

      <el-table-column
        prop="typeName"
        label="分类"
        width="120">
      </el-table-column>

      <el-table-column
        prop="time"
        label="答题时间（分钟）">
      </el-table-column>

      <el-table-column
        prop="top"
        label="排序">
      </el-table-column>

      <el-table-column
        prop="createdTime"
        label="创建时间">
      </el-table-column>

      <el-table-column
        prop="updatedTime"
        label="更新时间">
      </el-table-column>

      <el-table-column label="操作" width="300" align="center">
        <template slot-scope="scope">
          <router-link :to="'/subject/detail/'+scope.row.id">
            <el-button type="success" size="mini" icon="el-icon-caret-right">详情</el-button>
          </router-link>
          <router-link :to="'/subject/form/'+scope.row.id">
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
import subject from '@/api/subject/subject'

export default {
    data(){
        return {
            page: 1,
            limit: 10,
            total: 0,  //总记录数
            groupQuery: {},
            list: [], //查询后的接口返回值
            typeList:[],
        }
    },
    created(){  //页面渲染之前执行，一般用于执行methods中的方法
        this.getList();
        this.resetData();
        this.init();
    },
    methods:{
        init(){
            subject.getEnumList()
                .then(response => {
                    this.typeList = response.data.list
                })
        },
        getList(page = 1){
            this.page = page;
            subject.getListPage(this.page,this.limit,this.groupQuery)
            .then(response => {
                this.list = response.data.rows;
                this.total = response.data.total;
            })  //请求成功
            .catch(error => {
                console.log(error);
            })  //请求失败
        },
        resetData(){
            this.groupQuery = {};
            this.getList();
        },
        removeDataById(id){
            this.$confirm("此操作将永久删除该问题组，是否继续？","提示",{
                confirmButtonText:"确定",
                cancelButtonText:"取消",
                type:"warning"
            }).then(() => {
                subject.removeById(id)
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
          this.groupQuery = {};
          this.getList();
        }
    }
}
</script>