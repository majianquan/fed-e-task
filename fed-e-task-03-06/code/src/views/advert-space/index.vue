<template>
  <div class="advert-space">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button @click="$router.push({name: 'advert-space-create'})">添加</el-button>
    </div>
    <el-table
      :data="space"
      style="width: 100%">
      <el-table-column
        prop="spaceKey"
        label="spaceKey">
      </el-table-column>
      <el-table-column
        prop="name"
        label="广告位名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
        <el-button type="primary" @click="handleClick(scope.row.id)" size="small">编辑</el-button>
      </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllSpaces } from '@/services/advert-space'
export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      space: []
    }
  },
  created () {
    this.loadSpace()
  },
  methods: {
    async loadSpace () {
      const { data } = await getAllSpaces()
      this.space = data.content
    },
    handleClick (id: string) {
      this.$router.push({
        name: 'advert-space-edit',
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
