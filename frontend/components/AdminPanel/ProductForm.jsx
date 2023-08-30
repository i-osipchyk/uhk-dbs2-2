import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'

export default function ProductForm({ endpoint, closeForm }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    brand: '',
    category: '',
    release_year: '',
    gender: '',
    description: '',
    color_1: '',
    color_2: '',
    color_3: '',
  })
  const [product, setProduct] = useState([])
  const [productId, setProductId] = useState('')

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  console.log(formData)

  useEffect(() => {
    if (product.length > 0) {
      setFormData({
        new_name: product[1],
        new_price: product[2],
        new_brand: product[3],
        new_category: product[7],
        new_release_year: product[8],
        new_gender: product[9],
        new_description: product[10],
        new_color_1: product[4],
        new_color_2: product[5],
        new_color_3: product[6],
      })
    }
  }, [product])

  const getProduct = async () => {
    if (productId) {
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
  }

  const processProduct = async () => {
    let dataObject = formData
    if (endpoint === 'change_product') {
      dataObject = { ...formData, product_id: productId }
    }
    const config = {
      method: 'post',
      url: `http://127.0.0.1:5000/${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data:
        endpoint === 'delete_product' ? { product_id: productId } : dataObject,
    }

    await axios(config)
      .then((res) => {
        console.log(res)
        router.reload()
      })
      .catch((err) => console.error(err))
  }

  const form = useMemo(() => {
    if (endpoint === 'add_product') {
      return (
        <>
          <input
            name='name'
            placeholder='Name'
            value={formData.name}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='price'
            placeholder='Price'
            value={formData.price}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='brand'
            placeholder='Brand'
            value={formData.brand}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='color_1'
            placeholder='Color 1'
            value={formData.color_1}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='color_2'
            placeholder='Color 2'
            value={formData.color_2}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='color_3'
            placeholder='Color 3'
            value={formData.color_3}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='category'
            placeholder='Category'
            value={formData.category}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='release_year'
            placeholder='Release year'
            value={formData.release_year}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='gender'
            placeholder='Sex'
            value={formData.gender}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='description'
            placeholder='Description'
            value={formData.description}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <button
            className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
            onClick={processProduct}
          >
            ADD PRODUCT
          </button>
        </>
      )
    } else if (endpoint === 'change_product') {
      return product.length > 0 ? (
        <>
          <input
            name='new_name'
            placeholder='Name'
            value={formData.new_name}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_price'
            placeholder='Price'
            value={formData.new_price}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_brand'
            placeholder='Brand'
            value={formData.new_brand}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_color_1'
            placeholder='Color 1'
            value={formData.new_color_1}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_color_2'
            placeholder='Color 2'
            value={formData.new_color_2}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_color_3'
            placeholder='Color 3'
            value={formData.new_color_3}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_category'
            placeholder='Category'
            value={formData.new_category}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_release_year'
            placeholder='Release year'
            value={formData.new_release_year}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_gender'
            placeholder='Sex'
            value={formData.new_gender}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <input
            name='new_description'
            placeholder='Description'
            value={formData.new_description}
            onChange={onInputChange}
            className='loginPageInput'
          />
          <button
            className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
            onClick={processProduct}
          >
            SAVE CHANGES
          </button>
        </>
      ) : (
        <>
          <input
            name='product_id'
            placeholder='Please enter product id'
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            className='loginPageInput'
          />
          <button
            className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
            onClick={getProduct}
          >
            ENTER
          </button>
        </>
      )
    } else if (endpoint === 'delete_product') {
      return (
        <>
          <input
            name='product_id'
            placeholder='Please enter product id'
            onChange={(e) => setProductId(e.target.value)}
            value={productId}
            className='loginPageInput'
          />
          <button
            className='w-full h-[80px] border border-mainOrange cursor-pointer hover:bg-mainOrange hover:text-white font-bold rounded-md transitionDuration'
            onClick={processProduct}
          >
            DELETE
          </button>
        </>
      )
    }
  }, [formData, productId])

  return (
    <div className='w-full flex flex-col gap-[20px] justify-start'>
      <button
        className='rounded-full flex items-center justify-center w-[30px] h-[30px] font-bold text-mainOrange border-2 border-mainOrange hover:bg-mainOrange hover:text-white'
        onClick={closeForm}
      >
        X
      </button>
      {form}
    </div>
  )
}
