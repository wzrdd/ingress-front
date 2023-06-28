// Import from Library
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2'

// Custom Components
import Header from '../components/Header'
import LoginModal from '../components/LoginModal'

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) setIsLoggedIn(true)
    }, [])

    return (
        <>
            <Header />
            <div class="container-fluid">
                <div class="wrapper">
                    <div class="align-middle">
                        <div class="content">
                            <div>
                                <div class="row justify-content-md-center">
                                    <div class="col-md-auto">
                                        <h1>Home</h1>
                                    </div>
                                </div>
                                <div class="row justify-content-md-center">
                                    {
                                        isLoggedIn
                                            ? <HomeForLoggedUser />
                                            : <LoginModal />
                                    }
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function HomeForLoggedUser() {
    return (
        <>


                <div class="row justify-content-md-center">
                    <h1 class="col-md-auto">Home Page</h1>
                </div>
                <div class="row justify-content-md-center">
                    <div class="col-md-4">
                        <EmailForm/>
                    </div>
                </div>
        </>
    )
}

function EmailForm() {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `http://localhost:3300/api/v1/contact/create`

            const token = localStorage.getItem("token")
            const authorization = `Bearer ${token}`

            console.log(JSON.stringify({ email, message }))

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authorization
                },
                body: JSON.stringify({ email, message })
            });

            console.log(response)
            if (response.status == 200) {
                Swal.fire('Mensaje enviado!').then((confirm) => {
                    if (confirm.isConfirmed)
                        router.reload(window.location.pathname)
                })
            }
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                <div className="row justify-content-md-center">
                    <div className="col-md-auto">
                        <h2>Contacto</h2>
                    </div>
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 row justify-content-md-center">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Ingresa tu email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 row justify-content-md-center">
                                <label htmlFor="message" className="form-label">
                                    Message
                                </label>
                                <textarea
                                    className="form-control"
                                    id="message"
                                    rows="5"
                                    placeholder="Ingresa tu message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="row justify-content-md-center">
                                <div className="col-md-auto">
                                    <button type="submit" className="btn btn-primary">
                                        Enviar
                                    </button>
                                </div>
                            </div>
                        </form>
                        <p class="col-md-auto">Envíanos un mensaje a <Link href="/about">contacto.</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
