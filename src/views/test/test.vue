<template>
  <div id="test"
       v-if="!$store.state.isLoading">
    <p>单选题：</p>
    <div class="oneTest"
         v-for="(item, index) in test.radio"
         :key="index">
      <p class="question">{{index + 1 + '、'}}{{item.question}}</p>
      <ul class="options">
        <li v-for="(sonItem, sonIndex) in item.option"
            :key="sonIndex"
            :class="item.myAnswer && item.myAnswer.indexOf(sonIndex) !== -1 ? 'choose' : ''"
            @click="radioChoose(index, sonIndex)"><span>{{sonIndex}}</span>
          <p>{{sonItem}}</p>
        </li>
      </ul>
    </div>
    <p>多选题：</p>
    <div class="oneTest"
         v-for="(item, index) in test.check"
         :key="index + test.radio.length">
      <p class="question">{{index + 1 + '、'}}{{item.question}}</p>
      <ul class="options">
        <li v-for="(sonItem, sonIndex) in item.option"
            :key="sonIndex"
            :class="item.myAnswer && item.myAnswer.indexOf(sonIndex) !== -1 ? 'choose' : ''"
            @click="checkChoose(index, sonIndex)"><span>{{sonIndex}}</span>
          <p>{{sonItem}}</p>
        </li>
      </ul>
    </div>
    <p>判断题：</p>
    <div class="oneTest"
         v-for="(item, index) in test.judge"
         :key="index + test.radio.length + test.check.length">
      <p class="question">{{index + 1 + '、'}}{{item.question}}</p>
      <ul class="options">
        <li v-for="(sonItem, sonIndex) in item.option"
            :key="sonIndex"
            :class="item.myAnswer && item.myAnswer.indexOf(sonIndex) !== -1 ? 'choose' : ''"
            @click="judgeChoose(index, sonIndex)"><span>{{sonIndex}}</span>
          <p>{{sonItem}}</p>
        </li>
      </ul>
    </div>
    <van-button type="default"
                @click="submit">提交答题卡</van-button>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  data () {
    return {
      excelJson: null,
      test: null,
      nowDate: new Date()
    }
  },
  methods: {
    submit () {
      Dialog.confirm({
        message: '您确定要提价答题卡吗？'
      })
        .then(() => {
          window.sessionStorage.setItem('result', JSON.stringify(this.test))
          this.$router.replace({
            path: '/result',
            query: {
              radioScore: this.$route.query.radioScore,
              checkScore: this.$route.query.checkScore,
              judgeScore: this.$route.query.judgeScore,
              useTime: new Date().getTime() - this.nowDate.getTime()
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    radioChoose (index, sonIndex) {
      this.$set(this.test.radio[index], 'myAnswer', sonIndex)
    },
    checkChoose (index, sonIndex) {
      if (this.test.check[index].myAnswer) {
        if (this.test.check[index].myAnswer.indexOf(sonIndex) !== -1) {
          this.$set(this.test.check[index], 'myAnswer', this.test.check[index].myAnswer.split(sonIndex).join(''))
        } else {
          this.$set(this.test.check[index], 'myAnswer', this.test.check[index].myAnswer + sonIndex)
        }
      } else {
        this.$set(this.test.check[index], 'myAnswer', sonIndex)
      }
      console.log(this.test)
    },
    judgeChoose (index, sonIndex) {
      this.$set(this.test.judge[index], 'myAnswer', sonIndex)
    },
    createTest (sheetName) {
      const arr = new Set()
      let i = 0
      let testNumber = 0
      switch (sheetName) {
        case 'radio':
          testNumber = this.$route.query.radioValue
          break
        case 'check':
          testNumber = this.$route.query.checkValue
          break
        case 'judge':
          testNumber = this.$route.query.judgeValue
      }
      while (i < testNumber) {
        const num = Math.floor(Math.random() * this.excelJson[sheetName].length)
        if (!arr.has(num)) {
          arr.add(num)
          i++
        }
      }
      return arr
    }
  },
  created () {
    this.$store.commit('isLoading', true)
    if (!window.sessionStorage.getItem('test')) {
      const test = {
        radio: [],
        check: [],
        judge: []
      }
      const questionType = ['radio', 'check', 'judge']
      const ifExcelJson = JSON.parse(window.sessionStorage.getItem('excelJson'))
      if (ifExcelJson) {
        this.excelJson = ifExcelJson
        questionType.forEach(sheetName => {
          this.createTest(sheetName).forEach(num => {
            const arr = {}
            for (var i in this.excelJson[sheetName][num]) {
              if (i.length === 1) {
                arr[i] = this.excelJson[sheetName][num][i]
              }
            }
            const oneTest = this.excelJson[sheetName][num]
            oneTest.option = arr
            test[sheetName].push(oneTest)
          })
        })
      }
      window.sessionStorage.setItem('test', JSON.stringify(test))
      this.test = test
    } else {
      this.test = JSON.parse(window.sessionStorage.getItem('test'))
    }
    this.$store.commit('isLoading', false)
  }
}
</script>

<style lang="scss" scoped>
#test {
  padding: 1rem;
  .oneTest {
    background: white;
    border-radius: 0.5rem;
    padding: 0.01rem 1rem 1rem;
    margin: 1rem auto;
    .question {
      font-weight: bold;
      font-size: 1.1rem;
    }
    .options {
      background: #f8f8f8;
      padding: 0.7rem;
      border-radius: 0.5rem;
      li {
        list-style: none;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        span {
          flex-shrink: 0;
          border: #333333 solid .0333rem;
          height: 2rem;
          width: 2rem;
          border-radius: 50%;
          line-height: 2rem;
          color: #333333;
          text-align: center;
          margin-right: 1rem;
        }
        p {
          padding: .5rem;
          border: #333333 solid .0333rem;
          color: #333333;
          border-radius: .4rem;
          margin: 0;
          flex-grow: 1;
        }
      }
      .choose {
        span {
          border-color: transparent;
          background-color: #ffa500;
          color: white;
        }
        p {
          border-color: transparent;
          background-color: #ffa500;
          color: white;
        }
      }
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
    margin: 2rem 0;
  }
}
</style>
