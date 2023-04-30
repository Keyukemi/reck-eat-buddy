import ClientOnly from './components/ClientOnly';
import RegisterModal from './components/modals/RegisterModal';
import Navbar from './components/navbar/Navbar';
import './globals.css';
import { Montserrat } from 'next/font/google'
import ToasterProvider from './providers/ToasterProvider';

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
        <ClientOnly>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
          
        </ClientOnly>
        {children}
        </body>
    </html>
  )
}
