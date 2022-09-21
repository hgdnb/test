<template>
  <div id="result"
       v-if="!$store.state.isLoading">
    <div class="chart">
      <p class="chart_name">分值结果</p>
      <p>正确率：</p>
      <van-circle v-model="currentRate"
                  :rate="currentRate"
                  :speed="100"
                  :text="text"
                  :color="gradientColor"
                  size="10rem" />
      <div class="resultValue">
        <p><span></span>分值：{{totalPoints}}</p>
        <p><span></span>100分制：{{points}}</p>
        <p><span></span>用时：{{useTime}}</p>
        <p><span></span>单选：{{radioPoints}}</p>
        <p><span></span>多选：{{checkPoints}}</p>
        <p><span></span>判断：{{judgePoints}}</p>
      </div>
    </div>
    <p>错题：</p>
    <div class="mistakes">
      <div @click="goErrTest(radioErr)">单选题（{{radioErr.length}}）</div>
      <div @click="goErrTest(checkErr)">多选题（{{checkErr.length}}）</div>
      <div @click="goErrTest(judgeErr)">判断题（{{judgeErr.length}}）</div>
      <div @click="testAgain">继续做题</div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
export default {
  data () {
    return {
      currentRate: 0,
      totalPoints: 0,
      points: 0,
      useTime: 0,
      radioPoints: 0,
      checkPoints: 0,
      judgePoints: 0,
      radioErr: [],
      checkErr: [],
      judgeErr: [],
      gradientColor: {
        '0%': '#3fecff',
        '100%': '#6149f6'
      }
    }
  },
  methods: {
    goErrTest (errTest) {
      if (errTest.length === 0) {
        Toast('此类题型你没有错题哟，真棒！')
      } else {
        window.sessionStorage.setItem('mistake', JSON.stringify(errTest))
        this.$router.push('/mistake')
      }
    },
    testAgain () {
      window.sessionStorage.removeItem('test')
      window.sessionStorage.removeItem('result')
      window.sessionStorage.removeItem('mistake')
      this.$router.replace('/testSet')
    }
  },
  computed: {
    text () {
      return this.currentRate.toFixed(0) + '%'
    }
  },
  created () {
    const minute = parseInt(this.$route.query.useTime / (1000 * 60))
    const seconds = this.$route.query.useTime / 1000
    console.log('分钟' + minute + '秒钟' + seconds)
    if (seconds > 60) {
      this.useTime = minute + '分' + parseInt((seconds - parseInt(seconds / 60) * 60)) + '秒'
    } else {
      this.useTime = parseInt(seconds) + '秒'
    }
    this.$store.commit('isLoading', true)
    const result = JSON.parse(window.sessionStorage.getItem('result'))
    const radioScore = parseInt(this.$route.query.radioScore)
    const checkScore = parseInt(this.$route.query.checkScore)
    const judgeScore = parseInt(this.$route.query.judgeScore)
    const testNumber = result.radio.length + result.check.length + result.judge.length
    const totalScore = result.radio.length * radioScore + result.radio.length * checkScore + result.judge.length * judgeScore
    let rightTestNumber = 0
    result.radio.forEach(oneTest => {
      if (oneTest.myAnswer && oneTest.answer.split('').sort().join('') === oneTest.myAnswer.split('').sort().join('')) {
        rightTestNumber++
        this.radioPoints = radioScore + this.radioPoints
      } else {
        this.radioErr.push(oneTest)
      }
    })
    result.check.forEach(oneTest => {
      if (oneTest.myAnswer && oneTest.answer.split('').sort().join('') === oneTest.myAnswer.split('').sort().join('')) {
        rightTestNumber++
        this.checkPoints = checkScore + this.checkPoints
      } else {
        this.checkErr.push(oneTest)
      }
    })
    result.judge.forEach(oneTest => {
      if (oneTest.myAnswer && oneTest.answer.split('').sort().join('') === oneTest.myAnswer.split('').sort().join('')) {
        rightTestNumber++
        this.judgePoints = judgeScore + this.judgePoints
      } else {
        this.judgeErr.push(oneTest)
      }
    })
    this.totalPoints = this.radioPoints + this.checkPoints + this.judgePoints
    this.points = parseInt(this.totalPoints / totalScore * 100)
    this.currentRate = rightTestNumber / testNumber * 100
    this.$store.commit('isLoading', false)
  }
}
</script>

<style lang="scss" scoped>
#result {
  padding: 1rem;
  min-height: calc(100vh - 2rem);
  .chart {
    background: white;
    border-radius: 0.5rem;
    padding: 1rem;
    .chart_name {
      text-align: center;
      font-weight: bold;
      font-size: 1.1rem;
    }
    /deep/ .van-circle {
      display: block;
      margin: auto;
    }
    .resultValue {
      display: flex;
      justify-content: center;
      align-content: center;
      flex-wrap: wrap;
      margin-top: 1rem;
      p {
        min-width: 50%;
        display: flex;
        justify-content: start;
        align-items: center;
        span {
          display: block;
          height: 1rem;
          width: 1rem;
          margin-right: 0.5rem;
          background: #3fecff;
        }
      }
    }
  }
  .mistakes {
    display: flex;
    align-content: center;
    justify-content: space-between;
    flex-wrap: wrap;
    div {
      width: calc(50% - 1.5rem);
      text-align: center;
      padding: 0.5rem;
      margin: 0.5rem 0;
      background: #ffa500;
      color: white;
      border-radius: 0.5rem;
    }
  }
}
</style>
