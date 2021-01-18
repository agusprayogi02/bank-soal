import {useState} from 'react'

export default function useUser() {
  const getUser = () => {
    var userString = localStorage.getItem('user')
    var user = JSON.parse(userString)
    return user
  }

  const [user, setUser] = useState(getUser())

  const setUserLocal = (user) => {
    var stringData = JSON.stringify(user)
    localStorage.setItem('user', stringData)
    setUser(user)
  }

  const deleteUser = () => {
    localStorage.removeItem('user')
  }

  return {
    userdata: user,
    setUser: setUserLocal,
    delete: deleteUser,
  }
}
