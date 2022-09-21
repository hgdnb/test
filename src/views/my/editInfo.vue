<template>
  <div id="editInfo" v-if="!$store.state.isLoading">
    <van-cell-group v-if="$route.query.needEdit === 'username'">
      <van-field v-model="username"
                 label="用户名："
                 placeholder="请输入用户名" />
    </van-cell-group>
    <van-radio-group v-model="gender"
                     v-if="$route.query.needEdit === 'gender'">
      <van-radio name="男"
                 checked-color="#ffa500">男</van-radio>
      <van-radio name="女"
                 checked-color="#ffa500">女</van-radio>
    </van-radio-group>
    <div class="birthday"
         v-if="$route.query.needEdit === 'birthday'"
         @click="showPickerTime = true">
      <span>出生年月：</span>
      <p>{{`${birthday.getFullYear()}-${birthday.getMonth() + 1}-${birthday.getDate()}`}}</p>
    </div>
    <van-button type="default"
                @click="submit">保存修改并返回</van-button>
    <van-popup v-model="showPickerTime"
               position="bottom">
      <van-datetime-picker type="date"
                           title="选择年月日"
                           :min-date="minDate"
                           :max-date="maxDate"
                           @confirm="timeConfirm"
                           @cancel="timeCancel" />
    </van-popup>
  </div>
</template>

<script>
import userinfo from '@/api/Userinfo'
import { Toast } from 'vant'
export default {
  data () {
    return {
      gender: this.$route.query.gender,
      username: this.$route.query.username,
      birthday: new Date(this.$route.query.birthday),
      id: '',
      showPickerTime: false,
      minDate: new Date(1980, 0, 1),
      maxDate: new Date()
    }
  },
  methods: {
    submit () {
      switch (this.$route.query.needEdit) {
        case 'username':
          userinfo.setUser('username', this.id, this.username).then(res => {
            this.$router.back()
          }).catch(e => {
            Toast('修改失败')
          })
          break
        case 'birthday':
          userinfo.setUser('birthday', this.id, this.birthday).then(res => {
            this.$router.back()
          }).catch(e => {
            Toast('修改失败')
          })
          break
        case 'gender':
          userinfo.setUser('gender', this.id, this.gender).then(res => {
            this.$router.back()
          }).catch(e => {
            Toast('修改失败')
          })
          break
      }
    },
    timeConfirm (value) {
      this.birthday = value
      this.showPickerTime = false
    },
    timeCancel () {
      this.showPickerTime = false
    }
  },
  created () {
    this.$store.commit('isLoading', true)
    userinfo.findUser().then(res => {
      this.id = res[0].id
      const user = res[0].attributes
      this.username = user.username
      this.gender = user.gender
      this.birthday = user.birthday
      this.$store.commit('isLoading', false)
    }).catch(e => {
      Toast('程序出错了')
      this.$store.commit('isLoading', false)
    })
  }
}
</script>

<style lang="scss" scoped>
#editInfo {
  padding: 1rem;
  min-height: calc(100vh - 2rem);
  /deep/ .van-cell-group {
    overflow: hidden;
    border-radius: 0.5rem;
    .van-field {
      line-height: 2.5rem;
      font-size: 1rem;
    }
  }
  /deep/ .van-radio-group {
    display: flex;
    align-items: center;
    .van-radio {
      width: 50%;
    }
  }
  .birthday {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    p {
      color: rgb(138, 136, 136);
    }
  }
  /deep/ .van-button {
    width: calc(100vw - 2rem);
    height: 3.2rem;
    border: none;
    background: #ffa500;
    opacity: 1;
    color: white;
    border-radius: 1.6rem;
    margin-top: 2rem;
  }
}
</style>
