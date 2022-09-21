<template>
  <div id="upload"
       v-if="!$store.state.isLoading">
    <p>上传文件：<span class="warn">{{warnFile}}</span></p>
    <label class="uploadExcel">
      <img src="@/assets/image/upload.png"
           alt="">
      <p>{{fileName ? fileName : '点击上传文件'}}</p>
      <input type="file"
             style="display:none"
             @change="importExcel()"
             accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
             ref="importFile">
    </label>
    <p>题库标题：</p>
    <input type="text"
           v-model="fileTitle"
           placeholder="请输入题库标题"
           class="inputText">
    <p>搜索关键词：</p>
    <input type="text"
           v-model="keyword"
           placeholder="搜索关键词请用空格隔开"
           class="inputText">
    <p>题库描述：</p>
    <van-field v-model="message"
               rows="8"
               autosize
               type="textarea"
               maxlength="300"
               placeholder="请输入文件"
               show-word-limit />
    <van-button type="default"
                @click="submit">上传生成题库</van-button>
  </div>
</template>

<script>
import warnhouse from '@/api/Warehouse.js'
import { Dialog, Toast } from 'vant'
import XLSX from 'xlsx'
export default {
  data () {
    return {
      fileName: '',
      fileTitle: '',
      message: '',
      warnFile: '',
      warnTitle: '',
      warnDescribe: '',
      excelJson: {},
      keyword: ''
    }
  },
  methods: {
    importExcel () {
      const file = this.$refs.importFile.files[0]
      this.fileName = file.name
      const reader = new FileReader()
      try {
        reader.onload = e => {
          const data = e.target.result
          const workbook = XLSX.read(data, { type: 'binary' })
          const sheetNames = new Set(workbook.SheetNames)
          const ifModel = sheetNames.has('radio') && sheetNames.has('check') && sheetNames.has('judge')
          if (ifModel) {
            workbook.SheetNames.forEach((sheetName, index) => {
              const ws = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
              if (ws.length > 0) {
                if (ws[0].question && ws[0].answer) {
                  this.excelJson[sheetName] = ws
                  if (index === 2) {
                    this.warnFile = ''
                  }
                } else {
                  this.warnFile = '您的Excel的表头不符合规范'
                  this.excelJson = {}
                }
              } else {
                this.excelJson[sheetName] = ws
                if (index === 2) {
                  this.warnFile = ''
                }
              }
            })
          } else {
            this.warnFile = '您的Excel表格页面标题不符合规范'
            this.excelJson = {}
          }
        }
      } catch (error) {
        console.log('错误')
      }
      reader.readAsBinaryString(file)
    },
    submit () {
      if (Object.keys(this.excelJson).length !== 0 && this.fileTitle && this.message && this.keyword) {
        Dialog.confirm({
          message: '题库上传后会共享到题库广场，供大家一起学习，您确定要上传吗'
        })
          .then(() => {
            const arr = new Set(this.keyword.split(' '))
            arr.delete('')
            arr.delete(' ')
            this.$store.commit('isLoading', true)
            window.sessionStorage.setItem('excelJson', JSON.stringify(this.excelJson))
            warnhouse.setWarehouse(JSON.stringify(this.excelJson), this.fileTitle, Array.from(arr), this.message).then(res => {
              this.$router.replace('/testSet')
            }).catch(e => {
              this.$store.commit('isLoading', false)
              Toast('上传失败')
            })
          })
          .catch(() => {
          })
      } else {
        this.$store.commit('isLoading', false)
        Toast('请将以上信息填写完整')
      }
    }
  },
  created () {
    this.$store.commit('isLoading', false)
  }
}
</script>

<style lang="scss" scoped>
#upload {
  padding: 1rem 1rem 5rem;
  min-height: calc(100vh - 6rem);
  .warn {
    color: red;
    font-size: .9rem;
  }
  .uploadExcel {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;
    border-radius: .5rem;
    border: #ffa500 solid .0333rem;
    padding: 1rem;
    img {
      width: 2rem;
      height: 2rem;
      flex-shrink: 0;
      margin-right: 1rem;
    }
    p {
      font-size: .9rem;
      margin: 0;
      color: #ffa500;
      flex-grow: 1;
    }
  }
  .inputText {
    width: calc(100vw - 4rem);
    height: 2.8rem;
    background: white;
    border-radius: .5rem;
    border: none;
    padding: 0 1rem;
  }
  .van-field {
    border-radius: .5rem;
    font-size: 1rem;
  }
  /deep/ .van-button {
    width: calc(100vw - 2rem);
    height: 3.2rem;
    border: none;
    background: linear-gradient(234deg, #ffa500 0%, #ffa500 100%);
    opacity: 1;
    border-radius: 1.6rem;
    margin: 2rem 0;
    color: white;
  }
}
</style>
