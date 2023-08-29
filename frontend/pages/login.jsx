import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Cookies from 'js-cookie'
import LoginMethod from '../components/LoginPage/LoginMethod'
import LoginForm from '../components/LoginPage/LoginForm'

export default function login() {
  const [loginOption, setLoginOption] = useState('customer')
  const [signUp, setSignUp] = useState(false)
  const [formData, setFormData] = useState({})
  const [repeatPassword, setRepeatPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const { push } = useRouter()

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const loginUser = async () => {
    const endpoint =
      loginOption === 'customer' ? 'customer_login' : 'admin_login'
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    }

    await axios(config)
      .then(() => {
        Cookies.set('user_email', formData.email)
        Cookies.set(
          'user_type',
          loginOption === 'customer' ? 'customer' : 'admin'
        )
        push('/')
      })
      .catch((err) => setErrorMessage(err.response.data.message))
  }

  // const getProduct = async () => {
  //   const config = {
  //     method: 'post',
  //     url: `http://127.0.0.1:5000/get_id`,
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     data: { email: 'denis@denis.denis' }
  //   }

  //   await axios(config)
  //     .then((res) => console.log(res.json()))
  //     .catch((err) => console.error(err))
  // }

  // useEffect(() => {
  //   getProduct()
  // }, [])

  const registerUser = async () => {
    console.log('Data', JSON.stringify(formData))
    const endpoint =
      loginOption === 'customer'
        ? 'customer_registration'
        : 'admin_registration'
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: formData,
    }

    await axios(config)
      .then(() => {
        Cookies.set('user_email', formData.email)
        push('/')
      })
      .catch((err) => {
        const { data } = err.response
        console.log(data)
      })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    if (signUp) {
      registerUser()
    } else {
      loginUser()
    }
  }

  return (
    <div className='h-full w-full flex font-[500] text-[15px] bg-gray-50'>
      <div className='flex flex-col gap-5 w-fit h-fit m-auto items-center'>
        <LoginMethod
          loginOption={loginOption}
          setUserLoginOption={() => {
            setLoginOption('customer')
            setFormData({})
            setErrorMessage('')
          }}
          setAdminLoginOption={() => {
            setLoginOption('admin')
            setFormData({})
            setErrorMessage('')
          }}
          signUp={signUp}
          setSignUp={() => {
            setSignUp(true)
            setFormData({})
            setErrorMessage('')
          }}
          setSignin={() => {
            setSignUp(false)
            setFormData({})
            setErrorMessage('')
          }}
        />
        <LoginForm
          loginOption={loginOption}
          signUp={signUp}
          handleInputChange={() => handleInputChange}
          handleFormSubmit={() => handleFormSubmit}
          formData={formData}
          repeatPassword={repeatPassword}
          setRepeatPassword={(text) => setRepeatPassword(text)}
          errorMessage={errorMessage}
        />
      </div>
    </div>
  )
}
