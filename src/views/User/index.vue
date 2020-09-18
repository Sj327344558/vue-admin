<template>
  <div>
    用户首页
    <TableItem :tableConfig="tableConfig">
      <template slot="fun" slot-scope="scope">
        <el-button type="danger" size="mini" @click="handelDelete(scope)">删除</el-button>
        <el-button type="success" size="mini" @click="handelDelete(scope)">编辑</el-button>
      </template>
    </TableItem>
  </div>
</template>

<script>
import TableItem from '@/components/table/index'
export default {
  data() {
    return {
      tableConfig: {
        header: [
          {
            label: '邮箱用户名',
            name: 'email',
            width: '180',
          },
          {
            label: '账户',
            name: 'name',
            width: '180',
          },
          {
            label: '年龄',
            name: 'age',
            width: '180',
          },
          {
            label: '地址',
            name: 'address',
            width: '400',
          },
          {
            label: '角色',
            name: 'role',
            width: '180',
          },
          {
            label: '操作',
            name: 'slot',
          },
        ],
        selection: true,
        requestUrl: '',
      },
    }
  },
  components: {
    TableItem,
  },
  methods: {
    handelDelete(val) {
      console.log(val)
    },
  },
}
</script>

<style>
</style>