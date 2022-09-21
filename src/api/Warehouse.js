import AV from '@/api/AV'
import Userinfo from '@/api/Userinfo.js'

const warehouse = {}

warehouse.setWarehouse = async (excelJson, title, keyword, message) => {
  if (AV.User.current() !== null) {
    const userinfo = await Userinfo.findUser()
    const Warehouse = AV.Object.extend('Warehouse')
    const warehouse = new Warehouse()
    const user = AV.User.current()
    warehouse.set('excelJson', excelJson)
    warehouse.set('title', title)
    warehouse.set('message', message)
    warehouse.set('keyword', keyword)
    warehouse.set('username', userinfo[0].attributes.username)
    warehouse.set('email', userinfo[0].attributes.email)
    warehouse.set('userPhoto', userinfo[0].attributes.userPhoto)
    warehouse.set('user', user)
    return warehouse.save()
  } else {
    return false
  }
}

warehouse.delMyWarehouse = (id) => {
  const warehouse = AV.Object.createWithoutData('Warehouse', id)
  return warehouse.destroy()
}

warehouse.findMyWarehouse = (limit, skip) => {
  const query = new AV.Query('Warehouse')
  query.equalTo('user', AV.User.current())
  query.limit(limit)
  query.skip(skip)
  return query.find()
}

warehouse.findAllWarehouse = (limit, skip, keyword) => {
  const query = new AV.Query('Warehouse')
  keyword.length !== 0 ? query.containsAll('keyword', keyword) : console.log()
  query.limit(limit)
  query.skip(skip)
  return query.find()
}

export default warehouse
