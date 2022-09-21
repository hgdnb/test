import AV from '@/api/AV'

const userinfo = {}

userinfo.creativeUser = (email, username) => {
  const Userinfo = AV.Object.extend('Userinfo')
  const userinfo = new Userinfo()
  const user = AV.User.current()
  userinfo.set('gender', 'Unsex')
  userinfo.set('birthday', new Date())
  userinfo.set('username', username)
  userinfo.set('email', email)
  userinfo.set('userPhoto', require('@/assets/image/photo_man.png'))
  userinfo.set('user', user)
  return userinfo.save()
}

userinfo.findUser = () => {
  const query = new AV.Query('Userinfo')
  query.equalTo('user', AV.User.current())
  return query.find()
}

userinfo.setUser = (pty, id, content) => {
  console.log(id)
  const todo = AV.Object.createWithoutData('Userinfo', id)
  todo.set(pty, content)
  return todo.save()
}

export default userinfo
