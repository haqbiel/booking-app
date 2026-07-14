import Image from "next/image";

const HeaderSection = ({
    title,
    subtitle
}:{
    title: string;
    subtitle: string;
}) => {
  return (
    <header className="relative h-60 text-white overflow-hidden bg-primary">
        <div className="absolute inset-0 bg-primary/80">
            <Image src="/hero.jpg" alt="Header Image" fill className="object-cover object-center w-full h-full mix-blend-overlay"/>
        </div>
        <div className="relative flex flex-col justify-center items-center h-60 text-center pt-14">
            <h1 className="text-5xl font-bold leading-tight capitalize">{title}</h1>
            <p className="text-xl text-white/80">{subtitle}</p>
        </div>
      
    </header>
  )
}

export default HeaderSection
