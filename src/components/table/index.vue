<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-if="congfig.selection" type="selection" width="55">
      </el-table-column>
      <template v-for="item in congfig.header">
        <el-table-column v-if="item.name === 'slot'" :key="item.id" :prop="item.name" :label="item.label">
          <template slot-scope="scope">
            <slot name="fun" :data="scope.row" :id="scope.row.name">
            </slot>
          </template>
        </el-table-column>
        <el-table-column :key="item.id" :prop="item.name" :label="item.label" :width="item.width" v-else>
        </el-table-column>
      </template>

    </el-table>
  </div>

</template>

<script>
export default {
  props: {
    tableConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      congfig: {
        header: [],
        selection: false,
      },

      tableData: [
        {
          email: '2016-05-02',
          name: '王小虎',
          age: 16,
          address: '上海市普陀区金沙江路 1518 弄',
          role: '用户',
        },
        {
          email: '2016-05-02',
          name: '宋杰',
          age: 16,
          address: '上海市普陀区金沙江路 1518 弄',
          role: '用户',
        },
      ],
    }
  },
  mounted() {
    console.log(this.tableConfig)
    this.congfig.header = this.tableConfig.header
    this.congfig.selection = this.tableConfig.selection
  },
}
</script>

<style>
</style>