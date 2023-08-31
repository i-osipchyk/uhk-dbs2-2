import axios from 'axios'
import { useEffect, useState } from 'react'
import Products from '../../components/Shop/Products'

export default function Jordan() {
  const [products, setProducts] = useState([])

  const getProducts = async () => {
    const config = {
      method: 'get',
      url: `http://127.0.0.1:5000/get_jordan_products`,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    await axios(config)
      .then((res) => {
        setProducts(res.data)
      })
      .catch(() => setProducts([]))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className={`flex w-full h-fit min-h-[904px]`}>
      <Products noFilterPanel products={products} />
    </div>
  )
}
