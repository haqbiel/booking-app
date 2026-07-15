import Link from "next/link"
import Image from "next/image"

const hero = () => {
  return (
    <div className="relative h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
            <Image src ="/hero.jpg" alt="hero image" fill className="object-cover object-center w-full h-full"/>
            <div className="absolute inset-0 bg-ink/50"></div>
        </div>
        <div className="relative flex flex-col justify-center items-center h-full text-center">
          <h1 className="text-7xl font-extrabold leading-tight mb-3 capitalize">Book your luxury room</h1>
          <p className="text-xl text-white/80 mb-8">Get Special offer just for you today.</p>
          <div className="flex gap-5">
            <Link href="/room" className="bg-action text-white hover:bg-action-hover py-2.5 px-6 md:px-10 text-lg font-semibold hover:shadow-elevated transition-all duration-200">Book Now</Link>
            <Link href="/contact" className="bg-transparent border border-white text-white hover:bg-white hover:text-primary py-2.5 px-6 md:px-10 text-lg font-semibold transition-all duration-200">Contact Us</Link>
          </div>
        </div>
    </div>
  )
}

export default hero
