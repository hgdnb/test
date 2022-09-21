<template>
  <div id="register"
       v-if="!$store.state.isLoading">
    <p class="title">注册</p>
    <van-cell-group>
      <van-field v-model="email"
                 label="邮箱"
                 placeholder="请输入您的QQ邮箱" />
      <van-field v-model="password"
                 type="password"
                 placeholder="请输入密码"
                 label="密码" />
      <van-field v-model="passwordAgain"
                 type="password"
                 placeholder="请输入密码"
                 label="确认密码" />
    </van-cell-group>
    <div class="go_reigster">
      <van-button type="default"
                  @click="submit">注册</van-button>
    </div>
  </div>
</template>

<script>
import { register, logOut } from '@/api/_User.js'
import userinfo from '@/api/Userinfo.js'
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      email: '',
      password: '',
      passwordAgain: ''
    }
  },
  methods: {
    submit () {
      if (this.email && this.password === this.passwordAgain) {
        this.$store.commit('isLoading', true)
        register(this.email, this.email, this.password).then(res => {
          userinfo.creativeUser(this.email, this.email).then(res => {
            Dialog.alert({
              message: '注册成功，验证邮件已发送至您的QQ邮箱，请进行验证，否则不可登录'
            }).then(() => {
              logOut().then(res => {
                this.$router.replace('/login')
              })
            })
            this.$store.commit('isLoading', false)
          }).catch(e => {
            this.$store.commit('isLoading', false)
            Toast('注册失败，如果您已经注册请先进行邮箱注册')
          })
        }).catch(e => {
          this.$store.commit('isLoading', false)
          Toast('注册失败，如果您已经注册请先进行邮箱注册')
        })
      } else {
        Toast('以上输入框皆为必填，请填写完整')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#register {
  padding: 1rem;
  min-height: calc(100vh - 2rem);
  .title {
    text-align: center;
    font-weight: bold;
    font-size: 1.1rem;
  }
  /deep/ .van-cell-group {
    overflow: hidden;
    border-radius: 0.5rem;
    .van-field {
      line-height: 2.5rem;
      font-size: 1rem;
      .van-button {
        background: #ffa500;
        border: none;
        height: 2.5rem;
        font-size: 0.8rem;
      }
    }
  }
  .go_reigster {
    /deep/ .van-button {
      width: calc(100vw - 2rem);
      height: 3.2rem;
      border: none;
      background: #ffa500;
      color: white;
      opacity: 1;
      border-radius: 1.6rem;
      margin: 2rem 0;
    }
  }
}
</style>
