<template>
  <div class="course-create">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑课程</span>
      </div>
      <el-form
        :model="form"
        :rules="rules"
        ref="form"
        label-width="100px"
      >
        <el-form-item label="名称" prop="courseName">
          <el-input v-model="form.courseName" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="简介" prop="brief">
          <el-input v-model="form.brief" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师姓名" prop="teacherName">
          <el-input v-model="form.teacherName" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position" maxlength="50" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="讲师简介" prop="description">
          <el-input v-model="form.description" maxlength="100" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="课程概述" prop="previewFirstField">
        <el-row>
          <el-col :span="11">
            <el-input v-model="form.previewFirstField" min-length="3" maxlength="20" show-word-limit></el-input>
          </el-col>
          <el-col :span="12" :offset="1">
            <el-input v-model="form.previewSecondField" maxlength="20" show-word-limit></el-input>
          </el-col>
        </el-row>
        </el-form-item>
        <el-form-item label="课程排序" prop="sortNum">
          <el-input v-model="form.sortNum" type="number">
           <template slot="append">数字控制排序，数字越大越靠后</template>
          </el-input>
        </el-form-item>
        <el-form-item label="售卖价格" prop="discounts">
          <el-input v-model="form.discounts" type="number">
           <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="price">
          <el-input v-model="form.price" type="number">
           <template slot="append">元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="销售" prop="sales">
          <el-input v-model="form.sales" type="number">
           <template slot="append">单</template>
          </el-input>
        </el-form-item>
        <el-form-item label="活动标签" prop="discountsTag">
          <el-input v-model="form.discountsTag" maxlength="4" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="限时秒杀" prop="status">
          <el-switch
            v-model="form.status"
            active-color="red"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="课程详情" prop="courseDescriptionMarkDown">
          <editor
            api-key="no-api-key"
            v-model="form.courseDescriptionMarkDown"
            :init="{
              height: 400,
              menubar: false,
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount'
              ],
              toolbar:
                'undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help'
            }"
          />
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
import Editor from '@tinymce/tinymce-vue'
import { saveOrUpdateCourse, getCourseById } from '@/services/course'
export default Vue.extend({
  name: 'CourseCreate',
  components: {
    Editor
  },
  data () {
    return {
      form: {
        courseName: '',
        brief: '',
        teacherName: '',
        position: '',
        description: '',
        previewFirstField: '',
        previewSecondField: '',
        sortNum: null,
        discounts: null,
        price: null,
        sales: null,
        discountsTag: '',
        courseDescriptionMarkDown: ''
      },
      rules: {
        courseName: [{ required: true, message: '请输入课程名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }],
        brief: [{ required: true, message: '请输入简介', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],
        teacherName: [{ required: true, message: '请输入讲师姓名', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }],
        position: [{ required: true, message: '请输入职位', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' }],
        description: [{ required: true, message: '请输入讲师简介', trigger: 'blur' },
          { min: 3, max: 100, message: '长度在 3 到 100 个字符', trigger: 'blur' }],
        previewFirstField: [{ required: true, message: '请输入课程概述', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }],
        sortNum: [{ required: true, message: '请输入课程排序', trigger: 'blur' }],
        discounts: [{ required: true, message: '请输入售卖价格', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.loadCourse()
  },
  methods: {
    async loadCourse () {
      const { courseId } = this.$route.params
      const { data: { data } } = await getCourseById(courseId)
      data.description = data.teacherDTO.description
      data.position = data.teacherDTO.position
      data.teacherName = data.teacherDTO.teacherName
      delete data.teacherDTO
      this.form = data
    },
    onSubmit () {
      // 1. 表单验证
      this.$refs.form.validate(async valid => {
        if (valid) {
          const value = { ...this.form }
          value.activityCourseDTO = {}
          value.teacherDTO = {
            courseId: this.form.id,
            description: this.form.description,
            position: this.form.position,
            teacherName: this.form.teacherName
          }
          delete value.description
          delete value.position
          delete value.teacherName
          // 2. 验证通过，提交表单
          const { data } = await saveOrUpdateCourse(this.form)
          if (data.code === '000000') {
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
