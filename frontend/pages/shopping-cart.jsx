import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ShoppingCart() {
  const { push } = useRouter()

  const userId = Cookies.get('user_id')
  const userType = Cookies.get('user_type')
  useEffect(() => {
    if (!userId) {
      push('/')
    } else if (userType === 'admin') {
      push('/admin-panel')
    }
  }, [])
  return <div>shopping cart</div>
}
