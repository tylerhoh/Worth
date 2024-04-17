import Link from "next/link";
import { Search } from "./search";
import { Suspense } from "react";

export default function Navbar() {
  return (
    <main className="flex-row justify-between">
    <nav className="flex items-end  bg-white p-4">
    <Link href = "/" className="flex flex-col">    <div
className="border-b-8 border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
/>      
    <div
className="border-b-8 border-l-[20px] border-r-[20px] border-b-purple-500 border-l-transparent border-r-transparent"
/>
     <div
className="border-b-8 border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
/></Link>    
    <Link className="flex-col" href="/">
    <h1 className="text-xl center-left text-black py-0 font-serif inline-block">
    Worth
    </h1></Link>
    <Link href="/payments" className="text-m center-left text-black py-0 px-6 font-serif inline-block">Payments</Link>
    <Link href="/customers" className="text-m center-left text-black py-0 px-6 font-serif inline-block">Customers</Link>
    <Link href="/taxes" className="text-m center-left text-black py-0 px-8 font-serif inline-block">Taxes</Link>
    <Link href="/resources" className="text-m center-left text-black py-0 px-8 font-serif inline-block">Resources</Link>
    <Suspense>
        <Search className="w-full md:w-1/2" />
      </Suspense>
  </nav>
  </main>
  )
}
