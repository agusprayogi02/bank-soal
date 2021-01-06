import {useState} from 'react'

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    let id = ''
    if (tokenString) {
      const userToken = JSON.parse(tokenString)
      id = Buffer.from(userToken, 'base64').toString('ascii')
    }
    return String(id)
  }
  const [token, setToken] = useState(getToken())

  const saveToken = (id = '') => {
    var userToken = Buffer.from(id).toString('base64')
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(id)
  }

  const deleteToken = () => {
    localStorage.removeItem('token')
  }

  return {
    setToken: saveToken,
    logout: deleteToken,
    token,
  }
}
