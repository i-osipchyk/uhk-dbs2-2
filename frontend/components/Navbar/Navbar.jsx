import { useMemo } from 'react'
import { useRouter } from 'next/router'
import NavigationButton from './NavigationButton'

export default function Navbar({ currentRoute }) {
  const { push } = useRouter()

  const isSelected = useMemo(() => {
    if (currentRoute) {
      return 'shop'
    } else {
      return 'home'
    }
  }, [currentRoute])

  const pushRoute = (buttonLabel) => {
    if (buttonLabel === 'home') {
      push('/')
    } else {
      push(`/${buttonLabel}`)
    }
  }

  const navigationButtons = ['home', 'shop']

  return (
    <div className='h-[80px] flex items-center w-full p-[20px] mx-auto justify-between shadow-md relative'>
      <div className='w-[100px]'>
        <img src='/logo.png' alt='logo' />
      </div>
      <div className='flex items-center gap-[20px] font-[600] text-[14px] h-full'>
        {navigationButtons.map((label) => (
          <NavigationButton
            key={label}
            text={label.toUpperCase()}
            selected={isSelected === label}
            handleClick={() => pushRoute(label)}
          />
        ))}
      </div>
      <div className='flex items-center justify-end gap-2 w-[100px]'>
        <button className='navbarUserButton'>
          <img src='/profile-icon.png' alt='profile' />
        </button>
        <button className='navbarUserButton'>
          <img src='/cart-icon.png' alt='cart' />
        </button>
      </div>
    </div>
  )
}
