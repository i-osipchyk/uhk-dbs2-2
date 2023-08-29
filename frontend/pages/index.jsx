import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import BrandButton from '../components/BrandButton'
import Hero from '../components/Hero'
import SelectionButton from '../components/SelectionButton'

export default function Home() {
  const { push } = useRouter()

  // const email = Cookies.get('user_email')
  // useEffect(() => {
  //   if (!email) {
  //     push('/login')
  //   }
  // }, [])

  const logoutUser = () => {
    Cookies.remove('user_email')
    Cookies.remove('user_type')
    push('/login')
  }
  return (
    <div className='flex flex-col mx-auto w-full max-w-[1200px]'>
      <Hero />
      <div className='flex justify-between mt-[50px]'>
        <BrandButton img='/nike.png' alt='nike' />
        <BrandButton img='/adidas.png' alt='adidas' />
        <BrandButton img='/jordan.png' alt='jordan' />
        <BrandButton img='/converse.png' alt='converse' />
        <BrandButton img='/puma.png' alt='puma' />
        <BrandButton text='ALL BRANDS' />
      </div>
      <div className='flex mx-auto gap-[75px] mt-[50px]'>
        <SelectionButton img='/new-in.png' alt='new in' text='NEW IN' />
        <SelectionButton
          img='/best-sellers.png'
          alt='best sellers'
          text='BEST SELLERS'
        />
        <SelectionButton
          img='/exclusives.png'
          alt='exclusives'
          text='EXCLUSIVES'
        />
      </div>
      <div className='relative mt-[50px]'>
        <img
          src='/back-in-stock.png'
          alt='back in stock'
          className='h-[225px] w-[1200px]'
        />
        <span className='absolute top-[37.5px] left-[230.75px] text-[100px] text-[#D1483699] font-[700] z-10'>
          BACK IN STOCK
        </span>
      </div>
      <button onClick={logoutUser}>LOGOUT</button>
    </div>
  )
}
