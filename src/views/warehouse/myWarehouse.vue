<template>
  <div id="myWarehouse">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad">
      <transition-group name="list">
        <v-touch class="testList"
                 ref="test"
                 v-for="(item, index) in list"
                 @swiperight="DelList(index, item.id)"
                 :key="item.id">
          <div class="testList_up"
               @click="goTest(item.attributes.title, item.attributes.excelJson)">
            <img src="@/assets/image/excel.png"
                 alt="">
            <p>{{item.attributes.title}}</p>
          </div>
          <div class="testList_down"
               @click="goTest(item.attributes.title, item.attributes.excelJson)">
            <span>{{`${item.createdAt.getFullYear()}-${item.createdAt.getMonth() + 1}-${item.createdAt.getDate()}`}}</span>
            <van-icon :name="item.ifShowMessage ? 'arrow-up' : 'arrow-down'"
                      size="1.2rem"
                      @click.stop="item.ifShowMessage = !item.ifShowMessage" />
          </div>
          <div class="describe"
               v-show="item.ifShowMessage">
            <p>{{item.attributes.message}}</p>
          </div>
        </v-touch>
      </transition-group>
    </van-list>
  </div>
</template>

<script>
import Warehouse from '@/api/Warehouse.js'
import { Dialog, Toast } from 'vant'
export default {
  data () {
    return {
      skip: 0,
      list: [],
      loading: false,
      finished: false,
      testClass: ''
    }
  },
  methods: {
    onLoad () {
      Warehouse.findMyWarehouse(10, this.skip).then(res => {
        console.log(res)
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
      }).catch(e => {
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
    DelList (index, id) {
      this.$refs.test[index].$el.setAttribute('class', 'testList delActive')
      setTimeout(() => {
        this.$refs.test[index].$el.setAttribute('class', 'testList')
        Dialog.confirm({
          message: '您确定将这个题库删除吗'
        })
          .then(() => {
            Warehouse.delMyWarehouse(id).then(res => {
              this.$delete(this.list, index)
            })
          })
          .catch(() => {
          })
      }, 500)
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
#myWarehouse {
  padding: 1rem 1rem 5rem;
  min-height: calc(100vh - 6rem);
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
        width: 3.2rem;
        margin-right: 1rem;
      }
    }
    .testList_down {
      display: flex;
      justify-content: space-between;
      padding: 1rem;
      img {
        width: 1.5rem;
        height: 1.5rem;
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
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-leave-to {
    opacity: 0;
    position: relative;
    transform: translateX(20rem);
  }
  .delActive {
    animation: moveRight 0.5s;
  }
  @keyframes moveRight {
    0% {
      transform: translateX(0);
    }
    50% {
      transform: translateX(1.5rem);
    }
    100% {
      transform: translateX(0);
    }
  }
}
</style>
