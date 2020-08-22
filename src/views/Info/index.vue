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
            <SelectVue :config="data.configOption" />
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
        <el-button type="danger" class="pull-right" style="width: 100%;">新增</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    getList() {},
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
</style>