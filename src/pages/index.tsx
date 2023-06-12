import Link from 'next/link'

export default function Home() {
    return (
        <>
            <h1>Home</h1>

            <h2>
                <Link href='/users'>Usuarios</Link>
            </h2>

            <p>You know more about at<Link href="/about"> about us.</Link></p>
        </>
    )
}
