import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import FilterPanel from '../../components/Shop/FilterPanel'
import Products from '../../components/Shop/Products'

export default function Shop() {
  const [products, setProducts] = useState([])
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [filters, setFilters] = useState({})

  const getProducts = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/filter_products`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: filters
    }

    await axios(config)
      .then((res) => {
        setProducts(res.data)
      })
      .catch(() => setProducts([]))
  }

  useEffect(() => {
    getProducts()
  }, [filters])

  console.log(filters)
  return (
    <div className={`flex w-full h-[904px]`}>
      {isFilterPanelOpen && (
        <FilterPanel
          isFilterPanelOpen={isFilterPanelOpen}
          setIsFilterPanelOpen={() => setIsFilterPanelOpen((prev) => !prev)}
          setFilters={(key, value) => setFilters({ ...filters, [key]: value })}
          filters={filters}
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
