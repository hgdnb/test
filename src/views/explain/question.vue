<template>
  <div id="question">
    <div class="oneQuestion"
         @click.stop="item.isShow = !item.isShow"
         v-for="(item, index) in list"
         :key="index">
      <div>
        <img src="@/assets/image/issue.png"
             alt="">
        <p>{{item.question}}</p>
        <van-icon :name="item.isShow ? 'arrow-up' : 'arrow-down'"
                  size="1.3rem" />
      </div>
      <p v-show="item.isShow"
         class="answer">{{item.answer}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        { question: '站长编写这个程序的目的是什么？', answer: '站长在大学期间，临近期末老师都会下发题库，基本都是excel表格形式的，但是复习起来十分不方便，因此就诞生了做一个便捷式的刷题网站来决绝这个问题的想法。【好吧，不装了！打算找新的工作，没有拿的出手的项目，随便写一个项目充充数QmQ】', isShow: false },
        { question: '这个网站只支持excel文档的题库吗？', answer: '是的，因为excel层次较为清晰，生成题库更为方便和准确，所以暂时只支持excel类型的题库，暂不排除以后会有适配其它文档类型的题库。', isShow: false },
        { question: '如果题库不是excel格式的文档怎么办？', answer: '冇办法啦，你可以自己慢慢编辑成excel的形式嘛，牺牲你一个幸福全班人，哈哈哈！！【手动滑稽】', isShow: false },
        { question: '如果没有登录，能进行题库上传吗？', answer: '不行哟，原来是打算允许游客上传的，但是考虑到数据处理起来会很麻烦，干脆砍掉了，哈哈哈，不过游客可以直接使用别人上传的题库，也是很方便的。', isShow: false },
        { question: 'excel文档的内容一定要按照模板的样子来编排吗？', answer: '是的，站长的水平有限，冇办法实现智能化识别你的题目，索性干脆写死，必须严格按照模板的样子来编排。', isShow: false },
        { question: '题库的选项个数是固定的吗？', answer: '不固定，你爱填多少个选项填多少个，但是选项只能是单个字母，如果不是单个字母，是不会将其识别为选项的哟！', isShow: false },
        { question: '我上传了题库，但是之后又想删除掉怎么办？', answer: '很简单，先登录账户，进入“我的”页面，点击我的题库，找到你想要删除的题库，大拇指迅速向右滑动，就会弹出删除询问框，点击确定就可以啦！', isShow: false },
        { question: '我不小心删除了我的题库，应该怎么办？', answer: '重新上传一遍。【手动滑稽】', isShow: false },
        { question: '如果不退出登录，下次需要重新登录吗？', answer: '可以呀，只要你不退出登录，你就是到明年登录这个网站也不用重新登录。【前提是我这个网站能活那么久，哈哈哈】', isShow: '' },
        { question: '题库上传之后就一定要共享出去吗？可不可以不共享？', answer: '不行哟，要是人人都不共享自己的题库，我开发这个网站的意义就少了一半了。', isShow: false },
        { question: '账号绑定了是不是就不能修改了？', answer: '对的呢！我不知道怎么开发这个功能，对，就是这样！【其实就是我懒得写】', isShow: false },
        { question: '如何退出登录？', answer: '先进入“我的”页面，然后点击账号安全，点击退出登录就可以了。', isShow: false },
        { question: '如何修改用户信息？', answer: '先进入“我的”页面，然后点击账号安全，点击相应的信息进行修改就可以了。', isShow: false },
        { question: '错题为什么没有更新？', answer: '下拉刷新一下就好了。', isShow: false },
        { question: '现在网站界面就那么几个，之后会不会继续发布新的版本呢？', answer: '很大可能不会，写这个又没钱，我更新干嘛【手动滑稽】，再说这个网站的水平也很低，随便学一两个月前端就能写了，要是觉得功能不够，自己重新开发一个就好了。【O(∩_∩)O哈哈~】', isShow: false },
        { question: '我该如何联系站长？', answer: '你找我干嘛？给我送工作吗QmQ？要是送工作的话，QQ邮箱是这个：2564465541@qq.com，工资要求不高，别把我饿死在深圳就好QmQ。菜鸟前端在深圳没活路啊！啊！啊！卷不动了！', isShow: false }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
#question {
  padding: 1rem 1rem 6rem;
  min-height: calc(100vh - 7rem);
  .oneQuestion {
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      img {
        width: 1.5rem;
        height: 1.5rem;
      }
      p {
        flex-grow: 1;
        padding: 0 1rem;
        font-weight: bold;
      }
    }
    .answer {
      background: rgb(221, 220, 220);
      padding: 1rem;
      border-radius: 0.5rem;
      margin: 0.5rem;
    }
  }
}
</style>
