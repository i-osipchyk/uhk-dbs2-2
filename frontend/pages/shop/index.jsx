import axios from 'axios'
import { useEffect, useState } from 'react'
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

  return (
    <div className={`flex w-full h-fit min-h-[904px]`}>
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
