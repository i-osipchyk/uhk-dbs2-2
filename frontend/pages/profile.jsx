import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Profile() {
  const router = useRouter()
  const { push } = router
  const [userData, setUserData] = useState([])

  const userId = Cookies.get('user_id')
  //   const userType = Cookies.get('user_type')
  const getUserData = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/get_customer_data`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { customer_id: userId }
    }

    await axios(config)
      .then((res) => {
        setUserData(res.data[0])
      })
      .catch((err) => console.error(err))
  }
  useEffect(() => {
    if (!userId) {
      push('/')
    } else {
      getUserData()
    }
  }, [])

  const logoutUser = () => {
    Cookies.remove('user_id')
    Cookies.remove('user_type')
    Cookies.remove('user_email')
    router.reload()
  }

  console.log(userData)
  return (
    <div className='w-full h-[904px] flex items-center justify-center'>
      {userData.length > 0 && (
        <div className='w-fit min-w-[300px] h-fit shadow-blackShadow p-[20px] rounded-xl flex flex-col gap-[20px]'>
          <span className='self-center text-xl font-bold'>
            {userData[0]} {userData[1]}
          </span>
          <span>Email: {userData[2]}</span>
          <span>Phone: {userData[3]}</span>
          <span>Country: {userData[4]}</span>
          <span>City: {userData[5]}</span>
          <span>
            Address: {userData[6]} {userData[7]}
          </span>
          <span>Postal Code: {userData[8]}</span>
          <button
            className='w-full h-[40px] border border-red-600 cursor-pointer hover:bg-red-600 hover:text-white font-bold rounded-md transitionDuration'
            onClick={logoutUser}
          >
            LOG OUT
          </button>
        </div>
      )}
    </div>
  )
}
