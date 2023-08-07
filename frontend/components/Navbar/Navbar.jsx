import { useState } from 'react'
import NavigationButton from './NavigationButton'

export default function Navbar() {
  const [isSelected, setIsSelected] = useState('MEN')

  const navigationButtons = ['MEN', 'WOMEN', 'KIDS', 'BRANDS', 'SALE']

  return (
    <div className='h-[79px] flex items-center w-full justify-between'>
      <img src='/logo.png' alt='logo' className='mr-[44px]' />
      <div className='flex items-center gap-[20px] font-[600] text-[14px] h-full'>
        {navigationButtons.map((b) =>
          isSelected === b ? (
            <NavigationButton text={b} selected />
          ) : (
            <NavigationButton text={b} handleClick={() => setIsSelected(b)} />
          )
        )}
      </div>
      <div className='flex items-center'>
        <button className='navbarUserButton'>
          <img src='/profile-icon.png' alt='profile' />
        </button>
        <button className='navbarUserButton'>
          <img src='/cart-icon.png' alt='profile' />
        </button>
      </div>
    </div>
  )
}
