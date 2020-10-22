<template>
  <div class="advert">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button @click="$router.push({name: 'advert-create'})">添加</el-button>
      </div>
      <el-table
      :border="true"
      :data="showAdverts"
      style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="广告名称">
      </el-table-column>
      <el-table-column
        prop="spcaeName"
        align="center"
        label="广告位置">
      </el-table-column>
      <el-table-column
        align="center"
        label="广告图片">
        <template slot-scope="scope">
          <img :src="scope.row.img" height="80px" />
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        width="250px"
        label="时间">
        <template slot-scope="scope">
          <div>开始时间：{{scope.row.startTimeFormatString}}</div>
          <div>结束时间：{{scope.row.endTimeFormatString}}</div>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        align="center"
        label="上线/下线">
        <template slot-scope="scope">
          <el-switch
            @change="changeStatus(scope.row.id, $event)"
            :value="!!scope.row.status">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
        <el-link href="#" @click="handleClick(scope.row.id)">编辑</el-link>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :disabled="isLoading"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getAdList, updateStatus } from '@/services/advert'
import { getAllSpaces } from '@/services/advert-space'
Vue.filter('format', value => {
  const t = new Date(value)
  return `${t.getFullYear()}-${JSON.stringify(t.getMonth() + 1).padStart(2, '0')}-${JSON.stringify(t.getDate()).padStart(2, '0')} ${JSON.stringify(t.getHours()).padStart(2, '0')}:${JSON.stringify(t.getMinutes()).padStart(2, '0')}:${JSON.stringify(t.getSeconds()).padStart(2, '0')}`
})
export default Vue.extend({
  name: 'AdvertList',
  data () {
    return {
      adverts: [],
      pageSize: 10, // 每页数量
      pageNum: 1, // 当前页
      total: 0,
      isLoading: false
    }
  },
  created () {
    this.loadAdverts()
  },
  computed: {
    showAdverts () {
      return this.adverts.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
    }
  },
  methods: {
    async loadAdverts () {
      this.isLoading = true
      const { data: { content: adverts } } = await getAdList()
      const { data: { content: space } } = await getAllSpaces()
      adverts.forEach(item => {
        item.spcaeName = space.find(i => i.id === item.spaceId)?.name
      })
      this.adverts = adverts
      this.total = this.adverts.length
      this.pageNum = 1
      this.isLoading = false
    },
    getSpace (spaceId) {
      return this.space.find(item => item.id === spaceId)?.name
    },
    changeStatus (id, status) {
      this.$confirm('是否要修改上线/下线状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data } = await updateStatus(id, status ? 1 : 0)
        if (data.success) {
          this.loadAdverts()
          this.$message({
            type: 'success',
            message: '操作成功!'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      }).catch(() => {
        this.loadAdverts()
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.pageNum = 1
    },
    handleCurrentChange (val) {
      this.pageNum = val
    },
    handleClick (id) {
      this.$router.push({
        name: 'advert-edit',
        params: {
          id
        }
      })
    }
  }
})
</script>
<style lang="scss" scoped>
</style>
