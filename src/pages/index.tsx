import Image from 'next/image'
import { Inter } from 'next/font/google'
import InputFields from '@/components/InputFields'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col text-black items-center justify-between p-24 bg-white ${inter.className}`}
    >
      <InputFields />

      
    </main>
  )
}
