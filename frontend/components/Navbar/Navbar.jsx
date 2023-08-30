import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import NavigationButton from './NavigationButton'

export default function Navbar({ currentRoute }) {
  const { push } = useRouter()

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [isUserCustomer, setIsUserCustomer] = useState(true)

  const userId = Cookies.get('user_id')
  const userType = Cookies.get('user_type')

  useEffect(() => {
    if (userId) {
      setIsUserLoggedIn(true)
    }
    if (userType === 'admin') {
      setIsUserCustomer(false)
    }
  }, [])

  const selectedRoute = useMemo(() => {
    if (!currentRoute) {
      return 'home'
    } else if (currentRoute === 'shop') {
      return 'shop'
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
    <div className='h-[80px] flex items-center w-full p-[20px] mx-auto justify-between shadow-md relative bg-white text-black'>
      <div className='w-[100px]'>
        <img src='/logo.png' alt='logo' />
      </div>
      <div className='flex items-center gap-[20px] font-[600] text-[14px] h-full'>
        {navigationButtons.map((label) => (
          <NavigationButton
            key={label}
            text={label.toUpperCase()}
            selected={selectedRoute === label}
            handleClick={() => pushRoute(label)}
          />
        ))}
      </div>
      {isUserLoggedIn ? (
        isUserCustomer ? (
          <div className='flex items-center justify-end gap-2 w-[100px]'>
            <button
              className={`navbarUserButton ${
                currentRoute === 'profile' && 'border-2 border-mainOrange'
              }`}
              onClick={() => push('/profile')}
            >
              <img src='/profile-icon.png' alt='profile' />
            </button>
            <button
              className={`navbarUserButton ${
                currentRoute === 'shopping-cart' && 'border-2 border-mainOrange'
              }`}
              onClick={() => push('/shopping-cart')}
            >
              <img src='/cart-icon.png' alt='cart' />
            </button>
          </div>
        ) : (
          <button
            className='w-[100px] h-[40px] border border-mainOrange hover:bg-mainOrange hover:text-white transitionDuration'
            onClick={() => push('/admin-panel')}
          >
            Admin Panel
          </button>
        )
      ) : (
        <button
          className='w-[100px] h-[40px] border border-mainOrange hover:bg-mainOrange hover:text-white transitionDuration'
          onClick={() => push('/login')}
        >
          login
        </button>
      )}
    </div>
  )
}
