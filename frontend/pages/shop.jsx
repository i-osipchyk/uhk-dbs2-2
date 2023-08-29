import axios from 'axios'
import { useEffect, useMemo, useState } from 'react'
import FilterPanel from '../components/Shop/FilterPanel'
import Products from '../components/Shop/Products'

export default function Shop() {
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false)
  const [shopHeight, setShopHeight] = useState('')

  useEffect(() => {
    const height = window.innerHeight - 80
    setShopHeight(`h-[${height}px]`)
  }, [shopHeight])

  const getProducts = async () => {
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/get_customer_data`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: { customer_id: 3 },
    }

    // const data = { email: 'denis@denis.denis', password: 'denisdenis' }
    // await fetch('http://127.0.0.1:5000/customer_login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
    //   .then((res) => console.log(res.json()))
    //   .catch((err) => console.error(err))
    await axios(config)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.error(err))
  }

  useEffect(() => {
    getProducts()
  }, [])

  console.log(shopHeight)

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
      />
    </div>
  )
}
