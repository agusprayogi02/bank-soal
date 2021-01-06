import {useState} from 'react'

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token')
    let id = ''
    if (tokenString) {
      const userToken = JSON.parse(tokenString)
      id = Buffer.from(userToken, 'base64').toString('ascii')
    }
    return id
  }
  const [token, setToken] = useState(getToken())

  const saveToken = (id) => {
    var userToken = Buffer.from(id).toString('base64')
    sessionStorage.setItem('token', JSON.stringify(userToken))
    setToken(id)
  }

  return {
    setToken: saveToken,
    token,
  }
}
