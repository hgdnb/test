<template>
  <div id="warehouse">
    <div class="find">
      <van-field v-model="find"
                 :clearable="true"
                 placeholder="请输入关键词搜素" />
      <van-button :icon="require('@/assets/image/find.png')"
                  type="default"
                  @click="search"></van-button>
    </div>
    <van-pull-refresh v-model="isLoading"
                      @refresh="search">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad">
        <div class="testList"
             v-for="(item, index) in list"
             :key="index"
             @click="goTest(item.attributes.title, item.attributes.excelJson)">
          <div class="testList_up">
            <img :src="item.attributes.userPhoto"
                 alt="">
            <p>{{item.attributes.title}}</p>
          </div>
          <div class="testList_down">
            <div>
              <p>{{item.attributes.username}}</p>
              <span>{{`${item.createdAt.getFullYear()}-${item.createdAt.getMonth() + 1}-${item.createdAt.getDate()}`}}</span>
            </div>
            <van-icon :name="item.ifShowMessage ? 'arrow-up' : 'arrow-down'"
                      size="1.2rem"
                      @click.stop="item.ifShowMessage = !item.ifShowMessage" />
          </div>
          <div class="describe"
               v-show="item.ifShowMessage">
            <p>{{item.attributes.message}}</p>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Warehouse from '@/api/Warehouse.js'
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      skip: 0,
      find: '',
      keyword: [],
      isLoading: false,
      list: [], // 研资料列表
      loading: false, // 是否显示加载中
      finished: false // 是否已经没有更多了
    }
  },
  methods: {
    onLoad () {
      Warehouse.findAllWarehouse(10, this.skip, this.keyword).then(res => {
        res.forEach(item => {
          item.ifShowMessage = false
          this.list.push(item)
        })
        console.log(this.list)
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.skip += 10
          this.finished = false
        }
        this.isLoading = false
      }).catch(e => {
        this.isLoading = false
        Toast('程序出错了')
      })
    },
    goTest (title, excelJson) {
      Dialog.confirm({
        message: `您确定开始练习《${title}》吗？`
      })
        .then(() => {
          window.sessionStorage.setItem('excelJson', excelJson)
          this.$router.push('/testSet')
        })
        .catch(() => {
          // on cancel
        })
    },
    search () {
      const arr = new Set(this.find.split(' '))
      arr.delete('')
      arr.delete(' ')
      this.keyword = Array.from(arr)
      console.log(this.keyword)
      this.skip = 0
      this.list = []
      this.finished = false
    }
  }
}
</script>

<style lang="scss" scoped>
#warehouse {
  padding: 5.5rem 1rem;
  min-height: calc(100vh - 11rem);
  .find {
    width: calc(100vw - 2rem);
    padding: 1rem;
    background: white;
    display: flex;
    position: fixed;
    justify-content: space-between;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 888;
    /deep/ .van-field {
      background: #f8f8f8;
      height: inherit;
      line-height: inherit;
      font-size: 1rem;
      border-radius: 1.2rem;
    }
    /deep/ .van-button {
      background: #ffa500;
      opacity: 1;
      width: 2.3rem;
      height: 2.3rem;
      border-radius: 50%;
      margin-left: 1rem;
      flex-shrink: 0;
    }
  }
  /deep/ .van-pull-refresh {
    min-height: calc(100vh - 11rem);
  }
  .testList {
    background: white;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    .testList_up {
      display: flex;
      justify-content: start;
      align-items: center;
      margin-top: 0.5rem;
      img {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
        border: black solid 0.033333rem;
        margin-right: 1rem;
      }
    }
    .testList_down {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0.5rem 1rem;
      div {
        display: flex;
        align-items: center;
        p {
          margin: 0 1rem 0 0;
          padding: 0;
        }
        span {
          font-size: 0.7rem;
          padding: 0.2rem 0.4rem;
          background: #ffa500;
          border-radius: 0.5rem;
          color: white;
        }
      }
    }
    .describe {
      background: #f8f8f8;
      padding: 0.5rem 0.7rem;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      p {
        margin: 0;
      }
    }
  }
}
</style>
