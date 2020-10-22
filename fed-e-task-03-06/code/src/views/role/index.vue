<template>
  <div class="role">
    <el-card class="box-card">
      <el-row type="flex" justify="space-between">
        <el-col :span="1">
          <span>筛选搜索</span>
        </el-col>
        <el-col :span="3">
            <el-button size="small">重置</el-button>
            <el-button size="small" type="primary">查询搜索</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="1">
          <el-form label-position="left" ref="form" :inline="true" label-width="60px">
            <el-form-item label="手机号:">
              <el-input placeholder="请输入手机号" v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <el-button @click="addRole" size="small">添加角色</el-button>
      </div>
        <el-table
          :data="roles"
          style="width: 100%; margin-bottom: 20px"
          v-loading="isLoading"
        >
          <el-table-column
            prop="id"
            label="编号">
          </el-table-column>
          <el-table-column
            prop="name"
            label="角色名称">
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述">
          </el-table-column>
          <el-table-column
            label="添加时间">
            <template slot-scope="scope">
              {{scope.row.createdTime | formatTimer}}
            </template>
          </el-table-column>

          <el-table-column
            label="操作" width="140">
            <template slot-scope="scope">
              <el-button
              type="text"
                size="mini"
                @click="handleMenu(scope.row)">分配菜单</el-button>
              <el-button
              type="text"
                size="mini"
                @click="handleResource(scope.row)">分配资源</el-button>
              <el-button
              type="text"
                size="mini"
                @click="editRole(scope.row)">编辑</el-button>
              <el-button
              type="text"
                size="mini"
                @click="delRole(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-card>
    <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="30%">
      <el-form :model="editForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="name">
          <el-col :span="16">
            <el-input v-model="editForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="编码" prop="name">
          <el-col :span="16">
            <el-input v-model="editForm.code"></el-input>
          </el-col>
        </el-form-item>
          <el-col :span="18">
            <el-form-item label="描述" prop="desc">
              <el-input type="textarea" v-model="editForm.description"></el-input>
            </el-form-item>
          </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer text-center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sumbitAddRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAllRole, addOrUpdateRole, removeRole } from '@/services/role'
import { Form } from 'element-ui'
export default Vue.extend({
  name: 'LoginIndex',
  data() {
    return {
      form: {
        name: ''
      },
      roles: [],
      editForm: {
        id: '',
        code: '',
        name: '',
        description: ''
      },
      isLoading: true,
      formLabelWidth: '120px',
      dialogFormVisible: false
    }
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
  async created() {
    this.loadRole()
  },
  methods: {
    async loadRole() {
      this.isLoading = true
      const { data } = await getAllRole()
      this.roles = data.data
      this.isLoading = false
      console.log(data)
    },
    addRole() {
      this.editForm = {
        id: '',
        code: '',
        name: '',
        description: ''
      }
      this.dialogFormVisible = true
    },
    async sumbitAddRole(isNew: boolean) {
      const params = JSON.parse(JSON.stringify(this.editForm))
      if (params.id === '') {
        delete params.id
      }
      const { data } = await addOrUpdateRole(params)
      if (data.code === '000000') {
        if (params.id !== 0) {
          this.$message.success('删除成功')
        } else {
          this.$message.success('新增成功')
        }
        this.dialogFormVisible = false
        this.loadRole() // 更新数据列表
      }
    },
    handleRole() {
      console.log('123')
    },
    handleResource() {
      console.log('123')
    },
    editRole(row: any) {
      const { id, code, name, description } = row
      this.editForm = {
        id,
        code,
        name,
        description
      }
      this.dialogFormVisible = true
    },
    async delRole(row: any) {
      const { data } = await removeRole(row.id)
      if (data.code === '000000') {
        this.$message.success('删除成功')
        this.loadRole() // 更新数据列表
      }
    },
    resetForm(formName: any) {
      (this.$refs.form as Form).resetFields()
      this.loadRole()
    }
  }
})
</script>

<style lang="scss" scoped></style>
