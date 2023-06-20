import Link from 'next/link'
import Header from '../components/Header'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const mdTheme = createTheme();

export default function Home() {
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
                    <h1>Home Page</h1>
                    <h2>
                        <Link href='/users'>Usuarios</Link>
                    </h2>

                    <p>Envíanos un mensaje a <Link href="/about">contacto.</Link></p>

                </Box>
            </ThemeProvider>
        </>
    )
}
