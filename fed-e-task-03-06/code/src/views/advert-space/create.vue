<template>
  <div class="space-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>添加广告位</span>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="广告位名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit('form')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { saveOrUpdate } from '@/services/advert-space'
export default Vue.extend({
  name: 'AdvertSpaceCreate',
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [
          {
            required: true
          }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      // 1. 表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 2. 验证通过，提交表单
          const { data } = await saveOrUpdate(this.form)
          if (data.success) {
            this.$router.back()
            this.$message.success('提交成功')
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
})
</script>

<style></style>
