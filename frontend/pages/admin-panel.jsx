// import Cookies from 'js-cookie'
// import { useRouter } from 'next/router'
// import { useEffect } from 'react'

import { useState } from 'react'
import ProductForm from '../components/AdminPanel/ProductForm'

export default function AdminPanel() {
  // const { push } = useRouter()

  const [endpoint, setEndpoint] = useState('')

  // const userType = Cookies.get('user_type')
  // useEffect(() => {
  //   if (userType === 'customer' || !userType) {
  //     push('/')
  //   }
  // }, [])
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
          </>
        )}
      </div>
    </div>
  )
}
