import AV from 'leancloud-storage'

const APP_ID = 'JVDyxi57Bt9HyX6FcH7w4yW1-gzGzoHsz'
const APP_KEY = '6tcwr7gUvnbX1OMoYLUHdFXz'
const serverURL = 'https://jvdyxi57.lc-cn-n1-shared.com'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURL: serverURL
})

export default AV
