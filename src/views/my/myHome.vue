<template>
  <div id="myHome"
       v-if="!$store.state.isLoading">
    <!--头部信息栏-->
    <header>
      <div class="user">
        <img class="user_phone"
             :src="userPhoto"
             alt="">
        <p>{{username}}</p>
        <img class="sex"
             :src="gender === '男' ? require('@/assets/image/man.png') : gender === '女' ? require('@/assets/image/girl.png') : require('@/assets/image/unsex.png')"
             alt="">
      </div>
      <div class="target">
        <p>通知:</p>
        <span>疯狂更新中，希望大家用的开心</span>
      </div>
    </header>
    <!--底部路由栏-->
    <div class="router">
      <van-cell title="我的题库"
                is-link
                :icon="require('@/assets/image/student.png')"
                @click="$router.push('/myWarehouse')" />
      <van-cell title="题库广场"
                is-link
                @click="$router.push('/warehouse')"
                :icon="require('@/assets/image/sales.png')" />
      <van-cell title="账号安全"
                is-link
                :icon="require('@/assets/image/official.png')"
                @click="$router.push('/account')" />
    </div>
    <div class="router">
      <van-cell title="常见问题"
                is-link
                @click="$router.push('/question')"
                :icon="require('@/assets/image/issue.png')" />
      <van-cell title="找站长扯犊子"
                is-link
                @click="openWarn"
                :icon="require('@/assets/image/service.png')" />
    </div>
    <div class="router">
      <van-cell title="下载题库模板"
                is-link
                @click="downloadTestModel"
                :icon="require('@/assets/image/download.png')" />
      <van-cell title="上传生成题库"
                is-link
                @click="$router.push('/upload')"
                :icon="require('@/assets/image/goUpload.png')" />
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
import userinfo from '@/api/Userinfo.js'
import testModel from '@/utils/test_model.js'
export default {
  data () {
    return {
      username: '',
      userPhoto: require('@/assets/image/photo_man.png'),
      gender: ''
    }
  },
  methods: {
    openWarn () {
      Toast('还在开发中，敬请期待')
    },
    downloadTestModel () {
      Dialog.confirm({
        message: '您确定要下载题库模板吗？'
      })
        .then(() => {
          const elt = document.createElement('a')
          elt.setAttribute('href', testModel)
          elt.setAttribute('download', 'test_model.xlsx')
          elt.style.display = 'none'
          document.body.appendChild(elt)
          elt.click()
          document.body.removeChild(elt)
        })
        .catch(() => {
        })
    }
  },
  created () {
    this.$store.commit('isLoading', true)
    userinfo.findUser().then(res => {
      this.gender = res[0].attributes.gender
      this.userPhoto = res[0].attributes.userPhoto
      this.username = res[0].attributes.username
      this.$store.commit('isLoading', false)
    }).catch(e => {
      this.$store.commit('isLoading', false)
      Toast('程序出错了')
    })
  }
}
</script>

<style lang="scss" scoped>
#myHome {
  background: #f8f8f8;
  min-height: calc(100vh - 5rem);
  padding-bottom: 5rem;
  header {
    width: 100vw;
    height: 12rem;
    background: #ffa500;
    opacity: 1;
    padding-top: 2rem;
    .user {
      display: flex;
      align-items: center;
      .user_phone {
        width: 4.8rem;
        height: 4.8rem;
        margin-left: 1rem;
        background: rgba(0, 0, 0, 0);
        border: 0.033333rem solid #707070;
        border-radius: 50%;
        background-color: white;
        opacity: 1;
        object-fit: cover;
      }
      p {
        font-size: 1.333333rem;
        font-family: PingFang SC;
        font-weight: 300;
        color: white;
        opacity: 1;
        margin: 0 0.8rem;
      }
      .sex {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
    .target {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 1.066667rem;
      font-family: PingFang SC;
      font-weight: bold;
      opacity: 1;
      height: 2.6rem;
      background: white;
      border-radius: 0.666667rem;
      padding: 0 0.8rem;
      margin: 1.5rem 1rem;
      p {
        color: #999999;
      }
      span {
        flex-grow: 1;
        padding-left: 1rem;
      }
    }
  }
  .router {
    margin: 1rem 1rem 0;
    border-radius: 0.666667rem;
    position: relative;
    top: -3rem;
    overflow: hidden;
    /deep/ .van-icon {
      margin-right: 1rem;
    }
  }
}
</style>
