<template>
  <div class="course">
    <el-card class="box-card">
      <div slot="header" class="clearfix header">
        <el-form :inline="true" ref="form" :model="form" class="demo-form-inline">
          <el-form-item prop="courseName" label="课程名称">
            <el-input clearable v-model="form.courseName"></el-input>
          </el-form-item>
          <el-form-item prop="status" label="状态">
            <el-select clearable v-model="form.status">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="上架" :value="1"></el-option>
              <el-option label="下架" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="isLoading" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="$router.push({
          name: 'course-create'
        })">+ 新建课程</el-button>
      </div>
      <el-table
      :data="courses"
      v-loading="isLoading"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        prop="courseName"
        label="课程名称">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="sortNum"
        label="排序">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <el-tag :type="!scope.row.status ? 'danger': 'success'">{{!scope.row.status ? '已下架': '已上架'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :width="300"
        align="center"
        label="操作">
        <template slot-scope="scope">
        <el-button :type="!scope.row.status ? 'success': 'danger'" size="small" @click="changeState(scope.row.id, 1 - scope.row.status)">{{scope.row.status ? '下架': '上架'}}</el-button>
        <el-button @click="handleEdit(scope.row.id)" size="small">编辑</el-button>
        <el-button @click="handleClick(scope.row.id)" size="small">内容管理</el-button>
      </template>
      </el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { getQueryCourses, changeState } from '@/services/course'
export default Vue.extend({
  name: 'CourseList',
  data () {
    return {
      courses: [],
      form: {
        courseName: '',
        status: null,
        currentPage: 1,
        pageSize: 200
      },
      isLoading: false
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      this.isLoading = true
      try {
        const { data } = await getQueryCourses(this.form)
        this.courses = data.data.records
      } catch (e) {
        console.log('e', e)
      }
      this.isLoading = false
    },
    onSubmit () {
      this.loadCourses()
    },
    onReset () {
      this.$refs.form.resetFields()
      this.loadCourses()
    },
    async changeState (courseId, status) {
      const { data } = await changeState({
        courseId,
        status
      })
      if (data.code === '000000') {
        this.$message.success('操作成功！')
        this.loadCourses()
      }
    },
    handleEdit (courseId) {
      this.$router.push({
        name: 'course-edit',
        params: {
          courseId
        }
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
