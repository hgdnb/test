<template>
  <div id="login"
       v-if="!$store.state.isLoading">
    <p class="title">登录</p>
    <van-cell-group>
      <van-field v-model="email"
                 label="邮箱"
                 placeholder="请输入QQ邮箱" />
      <van-field v-model="password"
                 type="password"
                 placeholder="请输入密码"
                 label="密码" />
    </van-cell-group>
    <div class="otherOperat">
      <span @click="showPwDialog = true">找回密码</span>
      <span @click="showVerifyDialog = true">邮箱验证</span>
      <span @click="$router.push('/register')">去注册</span>
    </div>
    <div class="goLogin">
      <van-button type="default"
                  @click="submit">登录</van-button>
    </div>
    <van-dialog v-model="showPwDialog"
                title="修改密码"
                show-cancel-button
                @confirm="passwordReset">
      <p>请在下方输入您的QQ邮箱，我们将会发送邮件给您，之后您可以通过邮件重置密码</p>
      <van-field v-model="resetPwEmail"
                 label="邮箱："
                 placeholder="请输入QQ邮箱" />
    </van-dialog>
    <van-dialog v-model="showVerifyDialog"
                title="邮箱验证"
                show-cancel-button
                @confirm="emailVerify">
      <p>请在下方输入您的QQ邮箱，我们将会发送邮件给您，请进行邮箱验证</p>
      <van-field v-model="verifyEmail"
                 label="邮箱："
                 placeholder="请输入QQ邮箱" />
    </van-dialog>
  </div>
</template>

<script>
import { login, passwordReset, emailVerify } from '@/api/_User.js'
import { Toast } from 'vant'
export default {
  data () {
    return {
      email: '',
      password: '',
      showPwDialog: false,
      showVerifyDialog: false,
      resetPwEmail: '',
      verifyEmail: ''
    }
  },
  methods: {
    submit () {
      if (this.email && this.password) {
        this.$store.commit('isLoading', true)
        login(this.email, this.password).then(res => {
          this.$router.replace('/myHome')
        }).catch(e => {
          this.$store.commit('isLoading', false)
          Toast('登录失败,如果您已经注册请先进行邮箱验证')
        })
      } else {
        Toast('请先将账号密码填写完整')
      }
    },
    passwordReset () {
      if (this.resetPwEmail) {
        passwordReset(this.resetPwEmail)
        Toast('邮件已发送至您的QQ邮箱')
      } else {
        Toast('请先填写邮箱')
      }
    },
    emailVerify () {
      if (this.verifyEmail) {
        emailVerify(this.verifyEmail)
        Toast('邮件已发送至您的QQ邮箱,如果未收到邮件，可能是您已经进行过邮箱验证。')
      } else {
        Toast('请先填写邮箱')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#login {
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
    }
  }
  .otherOperat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
    color: #fdcb05;
  }
  .goLogin {
    /deep/ .van-button {
      width: calc(100vw - 2rem);
      height: 3.2rem;
      border: none;
      background: #ffa500;
      color: white;
      opacity: 1;
      border-radius: 1.6rem;
    }
  }
  /deep/ .van-dialog {
    p {
      margin: 1rem;
      line-height: 1.4rem;
    }
    .van-field {
      margin-bottom: 1rem;
      font-size: 1rem;
    }
  }
}
</style>
