import { useState } from 'react'
import { useRouter } from 'next/router'
import LoginMethod from '../components/LoginPage/LoginMethod'
import LoginForm from '../components/LoginPage/LoginForm'

export default function login() {
  const [loginOption, setLoginOption] = useState('user')
  const [signUp, setSignUp] = useState(true)
  const [formData, setFormData] = useState({})

  const { push } = useRouter()

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleFormSubmit(e) {
    e.preventDefault()
    push('/')
  }

  return (
    <div className='h-full w-full flex font-[500] text-[15px] bg-gray-50'>
      <div className='flex flex-col gap-5 w-fit h-fit m-auto items-center'>
        <LoginMethod
          loginOption={loginOption}
          setUserLoginOption={() => {
            setLoginOption('user')
            setFormData({})
          }}
          setAdminLoginOption={() => {
            setLoginOption('admin')
            setFormData({})
          }}
          signUp={signUp}
          setSignUp={() => {
            setSignUp(true)
            setFormData({})
          }}
          setSignin={() => {
            setSignUp(false)
            setFormData({})
          }}
        />
        <LoginForm
          loginOption={loginOption}
          signUp={signUp}
          handleInputChange={() => handleInputChange}
          handleFormSubmit={() => handleFormSubmit}
          formData={formData}
        />
      </div>
    </div>
  )
}
