<template>
<div class="user">
    <el-form label-position="top" :inline="true" label-width="80px">
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="注册时间">
        <el-col :span="11">
          <el-form-item >
            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.startCreateTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择开始日期" v-model="form.endCreateTime" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item style="padding-top: 50px">
        <el-button
          type="default"
          @click="onSubmit"
          :disabled="isLoading"
        >查询</el-button>
      </el-form-item>
    </el-form>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-table
          :data="users"
          style="width: 100%; margin-bottom: 20px"
          v-loading="isLoading"
        >
          <el-table-column
            prop="id"
            label="用户ID">
          </el-table-column>
          <el-table-column
            label="头像">
            <template slot-scope="scope">
              <el-avatar :src="scope.row.portrait"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号">
          </el-table-column>
          <el-table-column
            label="注册时间">
            <template slot-scope="scope">
              {{scope.row.createTime | formatTimer}}
            </template>
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
               <div class="status" :class="[scope.row.status === 'ENABLE' ? 'status-success' : 'status-danger']"></div>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleDisabled(scope.row)">禁用</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleRole(scope.row)">分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :disabled="isLoading"
          :current-page.sync="form.currentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
        </el-pagination>
      </div>
    </el-card>

</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserPages } from '@/services/user'
export default Vue.extend({
  name: 'UserIndex',
  data() {
    return {
      users: [],
      form: {
        currentPage: 0,
        pageSize: 0,
        phone: '',
        userId: 0,
        startCreateTime: '',
        endCreateTime: ''
      },
      totalCount: 0,
      isLoading: true
    }
  },
  async created() {
    this.loadUsers()
  },
  filters: {
    formatTimer (value: any) {
      const date = new Date(value)
      const y = date.getFullYear()
      let MM: any = date.getMonth() + 1
      MM = MM < 10 ? '0' + MM : MM
      let d: any = date.getDate()
      d = d < 10 ? '0' + d : d
      let h: any = date.getHours()
      h = h < 10 ? '0' + h : h
      let m: any = date.getMinutes()
      m = m < 10 ? '0' + m : m
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m
    }
  },
  methods: {
    async loadUsers() {
      this.isLoading = true
      const { data } = await getUserPages(this.form)
      this.users = data.data.records
      this.totalCount = data.data.total
      this.isLoading = false
    },
    onSubmit() {
      this.form.currentPage = 1 // 筛选查询从第 1 页开始
      this.loadUsers()
    },
    handleSizeChange (val: number) {
      this.form.pageSize = val
      this.form.currentPage = 1 // 每页大小改变重新查询第1页数据
      this.loadUsers()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.currentPage = val // 修改要查询的页码
      this.loadUsers()
    },
    handleDisabled(val: any) {
      console.log(val)
    },
    handleRole(val: any) {
      console.log(val)
    }
  }
})
</script>

<style lang="scss" scoped>
  .status {
    width: 1rem;
    height: 1rem;
  }
  .status-success {
    background-color: #67C23A;
  }
  .status-danger {
    background-color: #F56C6C;
  }
</style>
