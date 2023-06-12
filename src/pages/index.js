import Link from 'next/link'
import Header from '../components/Header'

export default function Home() {
    return (
        <>
            <Header />
            <h1>Home</h1>

            <h2>
                <Link href='/users'>Usuarios</Link>
            </h2>

            <p>You know more about at<Link href="/about"> about us.</Link></p>
        </>
    )
}
