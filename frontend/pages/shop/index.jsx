import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import FilterPanel from '../../components/Shop/FilterPanel'
import Products from '../../components/Shop/Products'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)

  const getProducts = async () => {
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
        setProducts(res.data)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className={`flex w-full h-[904px]`}>
      {isFilterPanelOpen && (
        <FilterPanel
          isFilterPanelOpen={isFilterPanelOpen}
          setIsFilterPanelOpen={() => setIsFilterPanelOpen((prev) => !prev)}
        />
      )}
      <Products
        isFilterPanelOpen={isFilterPanelOpen}
        setIsFilterPanelOpen={() => setIsFilterPanelOpen((prev) => !prev)}
        products={products}
      />
    </div>
  )
}
