import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductPage({ productId }) {
  const { push } = useRouter()

  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState(3)
  const [userType, setUserType] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const userTypeCookie = Cookies.get('user_type')
  const userId = Cookies.get('user_id')

  const getProduct = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/filter_products`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {}
    }

    await axios(config)
      .then((res) => {
        res.data.forEach((item) => {
          if (item[0] === Number(productId)) {
            setProduct(item)
          }
        })
        console.log(res.data)
      })
      .catch((err) => console.error(err))
  }

  const addProductToCart = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/add_product_to_order`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        customer_id: Number(userId),
        product_id: Number(productId),
        quantity,
        size
      }
    }

    await axios(config)
      .then(() => {
        push('/shopping-cart')
      })
      .catch((err) => setErrorMessage(err?.response?.data))
  }

  useEffect(() => {
    getProduct()
    setUserType(userTypeCookie)
  }, [])

  return (
    <div className='w-full h-[904px] flex items-center justify-center'>
      {product && (
        <div className='w-fit min-w-[300px] h-fit shadow-blackShadow p-[20px] rounded-xl flex flex-col gap-[20px]'>
          <span className='self-center text-xl font-bold'>
            {product[3]} {product[1]}
          </span>
          <span>{product[10]}</span>
          <span>Year: {product[8]}</span>
          <span>Sex: {product[9]}</span>
          <span>Price: {product[2]}</span>
          {userType === 'customer' ? (
            <>
              <div className='w-full flex gap-[20px] items-center'>
                <div className='flex-1 flex flex-col gap-[10px] items-center'>
                  <span>Quantity</span>
                  <input
                    type='number'
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className='w-[100px] rounded-md p-[10px] outline-none border border-black'
                    onKeyDown={(e) => e.preventDefault}
                  />
                </div>
                <div className='flex-1 flex flex-col gap-[10px] items-center'>
                  <span>Size</span>
                  <input
                    type='number'
                    min={3}
                    step={0.5}
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className='w-[100px] rounded-md p-[10px] outline-none border border-black'
                    onKeyDown={(e) => e.preventDefault}
                  />
                </div>
              </div>
              <span className='text-red-600 w-[300px] flex text-center'>
                {errorMessage}
              </span>
              <button
                className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
                onClick={addProductToCart}
              >
                ADD TO CART
              </button>
            </>
          ) : (
            !userType && (
              <button
                className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
                onClick={() => push('/login')}
              >
                LOG IN TO BUY
              </button>
            )
          )}
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { productId } = context.query
  return {
    props: {
      productId
    }
  }
}
