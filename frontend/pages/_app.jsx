import { useRouter } from 'next/router'
import Head from 'next/head'
import Navbar from '../components/Navbar/Navbar'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const currentRoute = router.pathname.split('/')[1]
  return (
    <>
      <Head>
        <title>ESHOP</title>
      </Head>
      {currentRoute !== 'login' && <Navbar currentRoute={currentRoute} />}
      <Component {...pageProps} />
    </>
  )
}
