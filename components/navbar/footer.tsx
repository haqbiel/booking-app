import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  return (
    <footer className="bg-primary">
        <div className="max-w-screen-xl mx-auto px-7 w-full py-10 md:py-16">
            <div className="grid md:grid-cols-3 gap-7">
                <div>
                  <Link href="/" className="mb-10 block">
                    <Image src="/logo.png" width={128} height={49} alt="logo" className="brightness-0 invert"/>
                  </Link>
                  <p className="text-white/70">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis est blanditiis officia ad magni laborum!
                  </p>
                </div>
                <div className="flex gap-20">
                  <div className="flex-1 md:flex-none">
                    <h4 className="mb-8 text-xl font-semibold text-white">Links</h4>
                    <ul className="list-item space-y-5 text-white/70">
                      <li>
                        <Link href="/" className="hover:text-white transition-colors duration-200">Home</Link>
                      </li>
                      <li>
                        <Link href="/about" className="hover:text-white transition-colors duration-200">About Us</Link>
                      </li>
                      <li>
                        <Link href="/room" className="hover:text-white transition-colors duration-200">Rooms</Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:text-white transition-colors duration-200">Contact Us</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 md:flex-none">
                      <h4 className="mb-8 text-xl font-semibold text-white">Support</h4>
                        <ul className="list-item space-y-5 text-white/70">
                          <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Legal</Link>
                          </li>
                          <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Term & Condition</Link>
                          </li>
                          <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Payment Method</Link>
                          </li>
                          <li>
                            <Link href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                          </li>
                        </ul>
                    </div>
                </div>
                <div>
                  <h4 className="mb-8 text-xl font-semibold text-white">NewsLetter</h4>
                  <p className="text-white/70">
                    Lorem ipsum dolor, sit amet consectetur adipisicing.
                  </p>
                  <form action="" className="mt-5">
                    <div className="mb-5">
                      <input type="text" name="email" className="w-full p-3 rounded-sm bg-white" placeholder="johndoe@gmail.com"/>
                    </div>
                    <button className="bg-highlight text-highlight-ink p-3 font-bold w-full text-center rounded-sm hover:bg-highlight/90 transition-colors duration-200">Subscribe</button>
                  </form>
                </div>
            </div>
        </div>
        <div className="max-w-screen-xl mx-auto px-4 border-t border-white/20 py-8 text-center text-base text-white/60">
            &copy; Copyright 2025 | Tutorial | All Right Reserved
        </div>
    </footer>
  )
}

export default Footer