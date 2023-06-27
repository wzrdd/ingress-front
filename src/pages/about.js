import Link from 'next/link'
import Header from '../components/Header'

export default function About() {
  return (
    <> 
      <Header/>
      <h1>About</h1>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </>
  )
}
