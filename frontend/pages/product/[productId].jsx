import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ProductPage({ productId }) {
  const [product, setProduct] = useState()

  const getProduct = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/filter_products`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {},
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

  useEffect(() => {
    getProduct()
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
          <button className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'>
            BUY
          </button>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  const { productId } = context.query
  return {
    props: {
      productId,
    },
  }
}
