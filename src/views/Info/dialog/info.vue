<template>
  <div>
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580px" @opened="openDialog" :append-to-body="true">
      <el-form :model="form" ref="addInfoForm">
        <el-form-item label="类别：" :label-width="formLabelWidth" prop="category">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <!-- <el-option v-for="item in categoryOption" :key="item.id" :label="item.category_name" :value="item.id">
            </el-option> -->
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

  </div>

</template>

<script>
import '@/style/elementui.scss'
export default {
  props: {
    flag: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    flag: {
      handler(newvalue, oldvalue) {
        this.dialog_info_flag = newvalue
        console.log('handler -> oldvalue', oldvalue)
        console.log('handler -> newvalue', newvalue)
      },
    },
  },
  data() {
    return {
      dialog_info_flag: false,
      form: {
        category: [],
        title: '',
        content: '',
      },
      formLabelWidth: '70px',
    }
  },
  methods: {
    submit() {},
    close() {
      this.dialog_info_flag = false
      //   this.$emit('close', false)
      this.$emit('update:flag', false)
      //回调值需要逻辑处理事  用上面的  ，不能用修饰器
    },
    openDialog() {},
  },
}
</script>

<style lang="scss" scoped>
</style>