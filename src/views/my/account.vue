<template>
  <div id="account"
       v-if="!$store.state.isLoading">
    <div class="userPhoto"
         @click="showPopup = true">
      <span>用户头像：</span>
      <img :src="userPhoto"
           alt="">
    </div>
    <div class="otherUserinfo"
         @click="editInfo('username')">
      <span>用户名：</span>
      <p>{{username}}</p>
    </div>
    <div class="otherUserinfo"
         @click="editInfo('email')">
      <span>QQ邮箱：</span>
      <p>{{email}}</p>
    </div>
    <div class="otherUserinfo"
         @click="editInfo('birthday')">
      <span>出生年月：</span>
      <p>{{birthday}}</p>
    </div>
    <div class="otherUserinfo"
         @click="editInfo('gender')">
      <span>性别：</span>
      <p>{{gender}}</p>
    </div>
    <van-button type="default"
                @click="logOut">退出登录</van-button>
    <van-popup v-model="showPopup">
      <van-uploader :after-read="afterRead" />
    </van-popup>
  </div>
</template>

<script>
import userinfo from '@/api/Userinfo'
import { logOut } from '@/api/_User'
import { Dialog, Toast } from 'vant'
export default {
  inject: ['reload'],
  data () {
    return {
      userPhoto: require('@/assets/image/photo_man.png'),
      username: '',
      email: '',
      birthday: '',
      gender: '',
      showPopup: false,
      id: ''
    }
  },
  methods: {
    logOut () {
      Dialog.confirm({
        message: '您确定要退出登陆吗？'
      })
        .then(() => {
          this.$store.commit('isLoading', true)
          logOut().then(res => {
            this.$router.replace('/login')
          }).catch(e => {
            this.$store.commit('isLoading', false)
            Toast('登出失败')
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    editInfo (needEdit) {
      switch (needEdit) {
        case 'username':
          this.$router.push({
            path: '/editInfo',
            query: {
              needEdit: needEdit
            }
          })
          break
        case 'birthday':
          this.$router.push({
            path: '/editInfo',
            query: {
              needEdit: needEdit
            }
          })
          break
        case 'gender':
          this.$router.push({
            path: '/editInfo',
            query: {
              needEdit: needEdit
            }
          })
          break
        case 'email':
          Toast('QQ邮箱一旦绑定则无法进行更改')
          break
      }
    },
    afterRead (file) {
      userinfo.setUser('userPhoto', this.id, file.content).then(res => {
        this.reload()
      }).catch(e => {
        Toast('修改失败')
      })
    }
  },
  created () {
    this.$store.commit('isLoading', true)
    userinfo.findUser().then(res => {
      console.log(res[0])
      const user = res[0].attributes
      this.id = res[0].id
      this.userPhoto = user.userPhoto
      this.username = user.username
      this.email = user.email
      this.gender = user.gender
      this.birthday = `${user.birthday.getFullYear()}-${user.birthday.getMonth() + 1}-${user.birthday.getDate()}`
      this.$store.commit('isLoading', false)
    }).catch(e => {
      Toast('程序出错了')
      this.$store.commit('isLoading', false)
    })
  }
}
</script>

<style lang="scss" scoped>
#account {
  min-height: calc(100vh - 2rem);
  padding: 1rem;
  .userPhoto {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffa500;
    border-radius: 0.5rem;
    color: white;
    padding: 1rem;
    margin-bottom: 1rem;
    img {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      border: solid black 0.033333rem;
      background-color: white;
    }
  }
  .otherUserinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    border-radius: 0.5rem;
    padding: 0.3rem 1rem;
    margin-bottom: 1rem;
    p {
      color: rgb(138, 136, 136);
    }
  }
  /deep/ .van-button {
    width: calc(100vw - 2rem);
    height: 3.2rem;
    border: none;
    background: #ffa500;
    color: white;
    opacity: 1;
    border-radius: 1.6rem;
    margin: 1rem 0;
  }
  /deep/.van-popup {
    border-radius: 50%;
    overflow: hidden;
    .van-uploader__upload {
      margin: 0;
    }
  }
}
</style>
