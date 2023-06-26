// Import from Library
import Link from 'next/link'
import { useEffect, useState } from 'react'

// Custom Components
import Header from '../components/Header'
import LoginModal from '../components/LoginModal'

// MaterialUI
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

export default function Home() {
    const mdTheme = createTheme();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) setIsLoggedIn(true)
    }, [])

    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <CssBaseline />
                <Header />
                <h1>Home</h1>

                <Box
                    sx={{ mt: 10, mx: 'auto', width: 700 }}
                    component={Paper}
                    variant={'outlined'}
                    align='center'
                >
                    {isLoggedIn
                        ? <HomeForLoggedUser />
                        : <LoginModal />
                    }
                </Box>
            </ThemeProvider>
        </>
    )
}

function HomeForLoggedUser() {
    return (
        <>
            <h1>Home Page</h1>
            <h2>
                <Link href='/users'>Usuarios</Link>
            </h2>

            <p>Envíanos un mensaje a <Link href="/about">contacto.</Link></p>
        </>
    )
}
