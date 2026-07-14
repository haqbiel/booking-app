import { formatCurrency } from "@/lib/utils"
import { Room } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { IoPeopleOutline } from "react-icons/io5"

const card = ({ room }: { room: Room }) => {
  return (
    <div className="bg-white shadow-card rounded-md transition-shadow duration-200 hover:shadow-elevated">
      <div className="h-[260px] w-auto rounded-t-md relative">
        <Image src={room.image} width={384} height={256} alt="room image" className="w-full h-full object-cover rounded-t-md" />
      </div>
      <div className="p-8">
        <h4 className="text-2xl font-bold text-ink">
          <Link href={`/room/${room.id}`} className="hover:text-action transition-colors duration-200">{room.name}</Link>
        </h4>
        <h4 className="text-2xl mb-7">
          <span className="font-bold text-ink">{formatCurrency(room.price)}</span>
          <span className="text-ink-muted text-sm">/Night</span>
        </h4>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-ink-muted">
            <IoPeopleOutline />
            <span>{room.capacity} {room.capacity === 1 ? "person" : "people"}</span>
          </div>
          <Link href={`/room/${room.id}`} className="px-6 py-2.5 md:px-10 md:py-3 font-semibold text-white bg-action rounded-sm hover:bg-action-hover transition-colors duration-200">Book Now</Link>
        </div>
      </div>
    </div>
  )
}

export default card
