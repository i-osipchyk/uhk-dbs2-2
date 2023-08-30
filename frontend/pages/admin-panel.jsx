import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function AdminPanel() {
  const { push } = useRouter()

  const userType = Cookies.get('user_type')
  useEffect(() => {
    if (userType === 'customer' || !userType) {
      push('/')
    }
  }, [])
  return <div>admin panel</div>
}
