<template>
  <div id="testSet">
    <p>单选题：</p>
    <div class="set">
      <van-slider v-model="radioValue" :max="radioMax" />
      <p>数量：{{radioValue}}</p>
      <div class="set_down">
        <span>分值：</span>
        <van-rate v-model="radioScore"
                  icon="like"
                  void-icon="like-o" />
      </div>
    </div>
    <p>多选题：</p>
    <div class="set">
      <van-slider v-model="checkValue" :max="checkMax" />
      <p>数量：{{checkValue}}</p>
      <div class="set_down">
        <span>分值：</span>
        <van-rate v-model="checkScore"
                  icon="like"
                  void-icon="like-o" />
      </div>
    </div>
    <p>判断题：</p>
    <div class="set">
      <van-slider v-model="judgeValue" :max="judgeMax"/>
      <p>数量：{{judgeValue}}</p>
      <div class="set_down">
        <span>分值：</span>
        <van-rate v-model="judgeScore"
                  icon="like"
                  void-icon="like-o" />
      </div>
    </div>
    <p>总分值：<span style="color: red">{{totalScore}}</span></p>
    <van-button type="default"
                @click="submit">上传生成题库</van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      radioMax: 0,
      checkMax: 0,
      judgeMax: 0,
      radioValue: 0,
      radioScore: 2,
      checkValue: 0,
      checkScore: 3,
      judgeValue: 0,
      judgeScore: 1
    }
  },
  computed: {
    totalScore () {
      return this.radioValue * this.radioScore + this.checkValue * this.checkScore + this.judgeValue * this.judgeScore
    }
  },
  methods: {
    submit () {
      window.sessionStorage.removeItem('test')
      this.$router.replace({
        path: '/test',
        query: {
          radioValue: this.radioValue,
          radioScore: this.radioScore,
          checkValue: this.checkValue,
          checkScore: this.checkScore,
          judgeValue: this.judgeValue,
          judgeScore: this.judgeScore
        }
      })
    }
  },
  created () {
    const excelJson = JSON.parse(window.sessionStorage.getItem('excelJson'))
    if (excelJson) {
      this.radioMax = excelJson.radio.length
      this.checkMax = excelJson.check.length
      this.judgeMax = excelJson.judge.length
    }
  }
}
</script>

<style lang="scss" scoped>
#testSet {
  padding: 1rem 1rem 5rem;
  min-height: calc(100vh - 6rem);
  .set {
    background: white;
    padding:1.5rem 1rem;
    border-radius: .5rem;
    .set_down {
      display: flex;
      justify-content: start;
      align-items: center;
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
    margin: 2rem 0;
  }
}
</style>
