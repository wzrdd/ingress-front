import { useRouter } from 'next/router'

export default function UserDetails() {
  const router = useRouter()

  const url = router.query
  return (
    <h1>Hola soy un {url.id}</h1>
  )
}
