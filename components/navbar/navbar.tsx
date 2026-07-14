import Link from "next/link"
import Image from "next/image"
import Navlink from "@/components/navbar/navlink";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full bg-primary z-20 shadow-card">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
            <Link href="/">
                <Image src="/logo.png" width={128} height={49} alt="logo" priority className="brightness-0 invert"/>
            </Link>
            <Navlink />
        </div>      
    </div>
  )
}

export default Navbar
