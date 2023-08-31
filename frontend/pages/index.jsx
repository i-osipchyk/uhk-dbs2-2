import { useRouter } from 'next/router'
import BrandButton from '../components/BrandButton'
import Hero from '../components/Hero'
import SelectionButton from '../components/SelectionButton'

export default function Home() {
  const router = useRouter()
  const { push } = router

  return (
    <div className='flex flex-col mx-auto w-full max-w-[1200px]'>
      <Hero />
      <div className='flex justify-between mt-[50px]'>
        <BrandButton
          img='/nike.png'
          alt='nike'
          onClick={() => push('/shop/nike')}
        />
        <BrandButton
          img='/adidas.png'
          alt='adidas'
          onClick={() => push('/shop/adidas')}
        />
        <BrandButton
          img='/jordan.png'
          alt='jordan'
          onClick={() => push('/shop/jordan')}
        />
        <BrandButton img='/converse.png' alt='converse' />
        <BrandButton img='/puma.png' alt='puma' />
        <BrandButton text='ALL BRANDS' onClick={() => push('/shop')} />
      </div>
      <div className='flex mx-auto gap-[75px] mt-[50px]'>
        <SelectionButton
          img='/new-in.png'
          alt='new in'
          text='NEW IN'
          onClick={() => push('/shop')}
        />
        <SelectionButton
          img='/best-sellers.png'
          alt='best sellers'
          text='BEST SELLERS'
          onClick={() => push('/shop')}
        />
        <SelectionButton
          img='/exclusives.png'
          alt='exclusives'
          text='EXCLUSIVES'
          onClick={() => push('/shop')}
        />
      </div>
      <div
        className='relative mt-[50px] cursor-pointer'
        onClick={() => push('/shop')}
      >
        <img
          src='/back-in-stock.png'
          alt='back in stock'
          className='h-[225px] w-[1200px]'
        />
        <span className='absolute top-[37.5px] left-[230.75px] text-[100px] text-[#D1483699] font-[700] z-10'>
          BACK IN STOCK
        </span>
      </div>
    </div>
  )
}
