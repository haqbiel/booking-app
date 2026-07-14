import { Metadata } from "next"
import Image from "next/image"
import { IoEyeOutline, IoLocateOutline } from "react-icons/io5"
import HeaderSection from "@/components/header-section"

export const metadata: Metadata = {
    title: "About",
    description: "Who we are",
}

const AboutPage = () => {
  return (
    <div>
      <HeaderSection title="About Us" subtitle="Lorem ipsum dolor sit amet."/>
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
            <Image src="/about-image.jpg" width={650} height={579} alt="about image"/>    
            <div>
                    <h1 className="text-5xl font-bold text-primary mb-4">Who We Are</h1>
                    <p className="text-ink-muted py-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe doloremque aut tempore ab esse nam adipisci eaque error quasi labore!</p>
                    <ul className="list-item space-y-6 pt-8">
                        <li className="flex gap-5">
                            <div className="flex-none mt-1">
                                <IoEyeOutline className="size-7 text-action"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1 text-ink">Vision :</h4>
                                <p className="text-ink-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, labore repellat enim veritatis molestias itaque?</p>
                            </div>
                        </li>
                        <li className="flex gap-5">
                            <div className="flex-none mt-1">
                                <IoLocateOutline className="size-7 text-action"/>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-semibold mb-1 text-ink">Mission :</h4>
                                <p className="text-ink-muted">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus modi enim placeat iusto omnis non, sit laborum velit nam vel!</p>
                            </div>
                        </li>
                    </ul>
                </div>  
            </div>
        </div>
    </div>
  )
}

export default AboutPage