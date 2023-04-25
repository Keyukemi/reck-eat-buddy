import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Montserrat } from 'next/font/google'

const font  = Montserrat({ 
  subsets: ['latin'] });

export const metadata = {
  title: 'Reck-Eat-Buddy',
  description: 'Your friendly neigbbourhood recipe buddy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
