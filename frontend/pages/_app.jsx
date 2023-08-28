import { useRouter } from 'next/router'
import Navbar from '../components/Navbar/Navbar'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const currentRoute = router.pathname.split('/')[1]
  return (
    <>
      {currentRoute !== 'login' && <Navbar currentRoute={currentRoute} />}
      <Component {...pageProps} />
    </>
  )
}
