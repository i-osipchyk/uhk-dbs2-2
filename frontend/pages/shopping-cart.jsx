import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ShoppingCart() {
  const router = useRouter()
  const { push } = router

  const [orderData, setOrderData] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const userId = Cookies.get('user_id')

  const getOrder = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/get_order_data`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { customer_id: userId }
    }

    await axios(config).then((res) => {
      setOrderData(res.data)
    })
  }

  const removeItemFromOrder = async (productId, productSize) => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/remove_item_from_order`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { customer_id: userId, product_id: productId, size: productSize }
    }

    await axios(config).then(() => {
      router.reload()
    })
  }

  const purchaseOrder = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/purchase`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: { customer_id: userId }
    }

    await axios(config)
      .then(() => {
        router.reload()
      })
      .catch((err) => setErrorMessage(err?.response?.data))
  }
  useEffect(() => {
    if (!userId) {
      push('/')
    } else {
      getOrder()
    }
  }, [])
  return (
    <div className='w-full h-[904px] flex items-center justify-center'>
      <div className='w-fit min-w-[600px] h-fit shadow-blackShadow p-[20px] rounded-xl flex flex-col gap-[20px]'>
        {orderData.length > 0 ? (
          <>
            {orderData.map((product) => (
              <div className='flex items-center justify-between p-[20px] border border-black rounded-md'>
                <span>
                  {product[2]} {product[1]}
                </span>
                <div className='flex items-center gap-[20px]'>
                  <span>Size: {product[9]}</span>
                  <span>Quantity: {product[11]}</span>
                  <button
                    className='rounded-full flex items-center justify-center w-[30px] h-[30px] font-bold text-mainOrange border-2 border-mainOrange hover:bg-mainOrange hover:text-white'
                    onClick={() => removeItemFromOrder(product[0], product[9])}
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
            <span className='text-red-600 self-center'>{errorMessage}</span>
            <button
              className='w-full h-[40px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
              onClick={purchaseOrder}
            >
              PURCHASE
            </button>
          </>
        ) : (
          <p className='self-center'>
            Looks like you didn't order anything yet
          </p>
        )}
      </div>
    </div>
  )
}
