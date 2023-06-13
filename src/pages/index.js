import Link from 'next/link'
import Header from '../components/Header'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const mdTheme = createTheme();

export default function Home() {
    return (
        <>
            <ThemeProvider theme={mdTheme}>
                <CssBaseline />
                <Header />
                <h1>Home</h1>

                <h2>
                    <Link href='/users'>Usuarios</Link>
                </h2>

                <p>You know more about at<Link href="/about"> about us.</Link></p>

            </ThemeProvider>
        </>
    )
}
