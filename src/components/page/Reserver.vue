<template>
  <div ref="reserver">
    <mt-field label="姓名" placeholder="请输入姓名" v-model="user_name"></mt-field>
    <mt-field label="电话号码" placeholder="请输入电话号码" v-model="user_phone"></mt-field>
    <mt-field label="预约时间" placeholder="请选择" v-model="reserver_time" @click.native="openPicker"></mt-field>
    <mt-button size="large" type="primary" @click.native="reserveClick">预约</mt-button>
    <mt-datetime-picker
      v-model="pickerValue"
      ref="picker"
      type="datetime"
      @confirm="handleConfirm"
      year-format="{value}"
      month-format="{value} 月"
      date-format="{value} 日"
      hourFormat="{value} 时"
      minuteFormat="{value} 分">
    </mt-datetime-picker>
  </div>
</template>

<script>
import moment from 'moment'
import { Toast, MessageBox } from 'mint-ui'
export default {
  name: 'reserver',
  data: function data () {
    return {
      user_name: '',
      user_phone: '',
      pickerValue: new Date(),
      reserver_time: ''
    }
  },
  methods: {
    openPicker: function () {
      this.$refs.picker.open()
    },
    handleConfirm: function () {
      this.reserver_time = moment(this.$refs.picker.value).format('YYYY-MM-DD HH:mm:ss')
    },
    reserveClick: function () {
      if (!this.user_name) {
        MessageBox('提示', '请输入姓名')
        return
      }
      if (!this.user_phone) {
        MessageBox('提示', '请输入电话号码')
        return
      }
      if (!this.reserver_time) {
        MessageBox('提示', '请输入预约时间')
        return
      }
      this.$http.post('/wechat/api/reserver', {
        openid: '',
        user_name: this.user_name,
        user_phone: this.user_phone,
        reserver_time: this.reserver_time
      }).then((response) => {
        console.log(response)
        Toast({
          message: '预约成功',
          iconClass: 'icon icon-success'
        })
      }).then((error) => {
        if (error) {
          console.log(error)
        }
      })
    }
  }
}
</script>
