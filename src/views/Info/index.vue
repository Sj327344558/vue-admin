<template>
  <div>
    <el-row :gutter="14">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for="">分类：</label>
          <div class="warp-content">
            <el-select v-model="category_value" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in options.category" :key="item.id" :label="item.category_name" :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for="">日期：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <el-date-picker style="width: 100%;" v-model="date_value" type="datetimerange" format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss" align="right" start-placeholder="开始日期" end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']">
            </el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-work">
          <label for="">关键字：&nbsp;&nbsp;</label>
          <div class="warp-content">
            <!-- <SelectVue :config="data.configOption" /> -->
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width: 100%;" @click="getList">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialog_info = true">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格数据 -->
    <div class="black-space-30"></div>
    <el-table :data="table_data.item" border @selection-change="handleSelectionChange" style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="750"></el-table-column>
      <el-table-column prop="categoryId" label="类型" width="130" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="237" :formatter="toData"></el-table-column>
      <el-table-column prop="user" label="管理员" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" size="mini" class="hiden-button">自定义指令测试</el-button>
          <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)" class="show-button">删除</el-button>
          <el-button type="success" size="mini" @click="editInfo(scope.row.id)" class="show-button">编辑</el-button>
          <el-button type="success" size="mini" @click="detailed(scope.row)" class="show-button">编辑详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="black-space-30"></div>
    <!--底部分页-->
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination class="pull-right" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </el-col>
    </el-row>

    <!--新增弹窗-->
    <DialogInfo :flag.sync="dialog_info" @close="closeDialog" />
    <!--修必弹窗-->
    <DialogEditInfo :flag.sync="dialog_info_edit" :id="infoId" :category="options.category" @getListEmit="getList" />
  </div>
</template>

<script>
import DialogInfo from './dialog/info'
import DialogEditInfo from './dialog/edit'
export default {
  components: {
    DialogInfo,
    DialogEditInfo,
  },
  data() {
    return {
      options: {
        category: '',
      },
      infoId: '',
      total: 100,
      dialog_info: false,
      dialog_info_edit: false,
      table_data: {
        item: [
          {
            title: '是福建傲破旧的坡附近坡地上',
            categoryId: '国内信息',
            createDate: '',
            user: '管理员',
          },
          {
            title: '是福建傲破旧的坡附近坡地上',
            categoryId: '国内信息',
            createDate: '',
            user: '管理员',
          },
          {
            title: '是福建傲破旧的坡附近坡地上',
            categoryId: '国内信息',
            createDate: '',
            user: '管理员',
          },
          {
            title: '是福建傲破旧的坡附近坡地上',
            categoryId: '国内信息',
            createDate: '',
            user: '管理员',
          },
        ],
      },
      category_value: '',
      date_value: '',
      search_keyWork: '',
      options: {
        category: [],
      },
      data: {
        configOption: {
          init: ['id', 'title'],
        },
      },
    }
  },
  methods: {
    detailed() {},
    deleteItem(val) {
      this.confirm({
        content: '确认删除当前信息，确认后将无法恢复',
        tip: '警告',
        fn: this.confirmDelete,
        id: '111111',
      })
    },
    deleteAll() {
      this.confirm({
        content: '确认删除选择的数据，确认后将无法恢复',
        type: 'success',
        fn: this.confirmDelete,
        id: 'ghjkl',
      })
    },
    confirmDelete(val) {
      console.log('confirmDelete -> val', val)
      console.log('确认删除')
    },

    editInfo(id) {
      // infoId.value = id;
      // dialog_info_edit.value = true;
    },
    getList() {},
    handleCurrentChange(val) {},
    handleSizeChange(val) {},
    getList() {},
    handleSelectionChange() {},
    toCategory() {},
    toData() {},
    closeDialog() {
      console.log('关闭弹窗')
      //逻辑性的事情
      this.dialog_info = false
    },
  },
}
</script>

<style lang="scss" scoped>
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-work {
    @include labelDom(right, 99, 40);
  }
}
</style>
<style>
button.hiden-button {
  display: none;
}
button.show-button {
  display: inline-block;
}
.el-col {
  min-height: 1px;
}
</style>