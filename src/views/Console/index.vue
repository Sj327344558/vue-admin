<template>
  <div>
    控制台
    <div id="echarts"></div>

    <el-tree ref="tree" show-checkbox :expand-on-click-node="false" :data="data" :props="defaultProps" node-key="id" @node-click="handleNodeClick"
      @check="check">
      <span slot-scope="{ node, data }">
        <template v-if="data.isEdit">
          <el-input v-model="data.name" autofocus size="mini" :ref="'slotTreeInput' + data.id" @blur.stop="handleInput(node, data)"
            @keyup.enter.native="handleInput(node, data)"></el-input>
        </template>
        <template v-else>
          <span>{{ node.label }}</span>
          <span>
            <el-button size="mini" icon="el-icon-plus" type="text" @click="handleAdd(node, data)"></el-button>
            <el-button size="mini" icon="el-icon-edit" type="text" @click="handleEdit(node, data)"></el-button>
            <el-button size="mini" icon="el-icon-delete" type="text" @click="handleDelete(node, data)"></el-button>
          </span>
        </template>
      </span>

    </el-tree>
  </div>
</template>

<script>
import echarts from 'echarts'
import { EchartsData } from '@/api/login.js'

export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name',
      },
    }
  },
  created() {},
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = echarts.init(document.getElementById('echarts'))
    console.log(myChart)
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts测试',
      },
      tooltip: {},
      toolbox: {
        feature: {
          dataZoom: {},
          brush: {
            type: ['rect', 'polygon', 'clear'],
          },
        },
      },
      xAxis: {
        type: 'value',
        scale: true,
        axisLabel: {
          formatter: '{value} cm',
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      dataZoom: [
        {
          type: 'inside',
        },
        {
          type: 'slider',
        },
      ],
      series: [
        {
          name: '采集点',
          type: 'scatter',
          symbolSize: 3,
          data: [],
        },
      ],
    })

    for (let index = 0; index < 10; index++) {
      let data = []
      EchartsData()
        .then((response) => {
          console.log('成功')
          console.log(response)
        })
        .catch((error) => {
          console.log('失败')
          console.log(error)
          console.log(error.data.result)
          // data = error.data.result

          myChart.appendData({
            seriesIndex: 0,
            data: error.data.result,
          })
        })
    }
  },

  // mounted() {
  //   let tree = require('../../../public/tree.json')
  //   console.log(tree)
  //   console.log(this.data)
  //   this.data.push(tree)
  // },
  methods: {
    handleNodeClick(data) {
      console.log(data)
    },
    check(data, node) {
      console.log(data)
      console.log(node)
    },
    handleAdd(node, data) {
      let length = data.children.length
      let pid = data.id

      if (length == 0) {
        let d = {
          name: '新增节点',
          id: pid + '001',
          children: [],
        }
        this.$refs.tree.append(d, node)
      }
      //子节点最下方的id
      let lid = data.children[length - 1].id.slice(-3)
      let cid = Number(lid) + 1

      //维护id
      if (cid > 900) {
        for (let index = 0; index < data.children.length; index++) {
          data.children[index].id = pid + '' + (Array(3).join(0) + (index + 1)).slice(-3)
        }
        lid = data.children[length - 1].id.slice(-3)
        cid = Number(lid) + 1
      }

      let id = pid + '' + (Array(3).join(0) + cid).slice(-3)
      let d = {
        name: '新增节点',
        id: id,
        children: [],
      }
      this.$refs.tree.append(d, node)
      node.expanded = true
    },
    handleDelete(node, data) {
      if (data.children && data.children.length !== 0) {
        this.$message.error('此节点有子级，不可删除！请通过子节点删除')
        return
      }
      this.$refs.tree.remove(data)
    },
    handleEdit(node, data) {
      this.$set(data, 'isEdit', true)
    },
    handleInput(node, data) {
      console.log(data)
      if (data.isEdit) {
        // this.$set(data, 'isEdit', false)
        this.$delete(data, 'isEdit')
      }
    },
  },
}
</script>

<style>
.el-tree-node__content {
  height: 28px;
}
#echarts {
  width: 1500px;
  height: 800px;
}
</style>