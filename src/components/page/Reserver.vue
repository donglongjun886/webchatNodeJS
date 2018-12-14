<template>
  <el-container>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="user_name">
          <el-input v-model="ruleForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="user_phone">
          <el-input v-model="ruleForm.user_phone"></el-input>
        </el-form-item>
        <el-form-item label="预约时间" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-time-picker type="fixed-time" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">预约</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      ruleForm: {
        user_name: '',
        user_phone: '',
        date1: '',
        date2: ''
      },
      rules: {
        user_name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        user_phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit reserver info')
          var reserverTime = new Date(this.ruleForm.date1)
          var date2 = new Date(this.ruleForm.date2)
          console.log(date2)
          reserverTime.setHours(date2.getHours())
          reserverTime.setMinutes(date2.getMinutes())
          reserverTime.setSeconds(date2.getSeconds())
          this.$http.post('/wechat/api/reserver', {
            openid: '80909',
            user_name: this.ruleForm.user_name,
            user_phone: this.ruleForm.user_phone,
            reserver_time: reserverTime
          })
            .then((response) => {
              console.log(response)
              alert(response.data)
            })
            .then((error) => {
              if (error) {
                console.log(error)
              }
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

</style>
