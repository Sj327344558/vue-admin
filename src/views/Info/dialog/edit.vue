<template>
  <el-dialog title="修改" :visible.sync="dialog_info_flag" @close="close" width="580px" @opened="openDialog">
    <el-form :model="form" ref="addInfoForm">
      <el-form-item label="类别：" :label-width="formLabelWidth" prop="category">
        <el-select v-model="form.category" placeholder="请选择活动区域">
          <el-option v-for="item in categoryOption" :key="item.id" :label="item.category_name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
        <el-input v-model="form.title" placehoder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth" prop="content">
        <el-input type="textarea" v-model="form.content" placehoder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// import { AddInfo, GetList, EdidInfo } from '@/api/news'
// import { reactive, ref, watch } from '@vue/composition-api'
export default {
  name: 'dialogInfo',
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Array,
      default: () => [],
    },
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialog_info_flag: false,
      form: {
        category: '',
        title: '',
        content: '',
      },
      formLabelWidth: '70px',
      categoryOption: [],
    }
  },
  methods: {
    close() {},
    submit() {},
    openDialog() {},
  },
}
</script>
<style scoped>
</style>