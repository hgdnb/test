<template>
  <div id="mistake">
    <div class="oneTest"
         v-for="(item, index) in errTest"
         :key="index">
      <p class="question">{{item.question}}</p>
      <ul class="options">
        <li v-for="(sonItem, sonIndex) in item.option"
            :key="sonIndex">{{sonIndex}}、{{sonItem}}</li>
      </ul>
      <div>
        <p>我的选择：{{item.myAnswer}}</p>
        <p>正确答案：{{item.answer}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      errTest: []
    }
  },
  created () {
    if (this.errTest.length === 0) {
      this.errTest = JSON.parse(window.sessionStorage.getItem('mistake'))
      console.log(this.errTest)
    }
  },
  activated () {
    this.errTest = JSON.parse(window.sessionStorage.getItem('mistake'))
  }
}
</script>

<style lang="scss" scoped>
#mistake {
  padding: 1rem;
  min-height: calc(100vh - 2rem);
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
      }
    }
  }
}
</style>
