import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import ProductForm from '../components/AdminPanel/ProductForm'

export default function AdminPanel() {
  const router = useRouter()
  const { push } = router

  const [endpoint, setEndpoint] = useState('')

  const logoutUser = () => {
    Cookies.remove('user_id')
    Cookies.remove('user_type')
    Cookies.remove('user_email')
    router.reload()
  }

  const userType = Cookies.get('user_type')
  useEffect(() => {
    if (userType === 'customer' || !userType) {
      push('/')
    }
  }, [])
  return (
    <div className='w-full h-[904px] flex flex-col items-center justify-center'>
      <div className='w-fit min-w-[300px] h-fit shadow-blackShadow p-[20px] rounded-xl flex flex-col gap-[20px]'>
        {endpoint ? (
          <ProductForm endpoint={endpoint} closeForm={() => setEndpoint('')} />
        ) : (
          <>
            <button
              className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
              onClick={() => setEndpoint('add_product')}
            >
              ADD PRODUCT
            </button>
            <button
              className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
              onClick={() => setEndpoint('change_product')}
            >
              EDIT PRODUCT
            </button>
            <button
              className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
              onClick={() => setEndpoint('delete_product')}
            >
              DELETE PRODUCT
            </button>
            <button
              className='w-full h-[40px] border border-red-600 cursor-pointer hover:bg-red-600 hover:text-white font-bold rounded-md transitionDuration'
              onClick={logoutUser}
            >
              LOGOUT
            </button>
          </>
        )}
      </div>
    </div>
  )
}
