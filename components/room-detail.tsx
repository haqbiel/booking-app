import Image from "next/image";
import { getRoomDetailById, getDisabledRoomById } from "@/lib/data";
import { notFound } from "next/navigation";
import { IoCheckmark, IoPeopleOutline } from "react-icons/io5";
import { formatCurrency } from "@/lib/utils";
import ReserveForm from "@/components/reserve-form";

const RoomDetail = async ({ roomId }: { roomId: string }) => {
    const [room, disabledDate] = await Promise.all([getRoomDetailById(roomId), getDisabledRoomById(roomId)]);
    if (!room || !disabledDate) return notFound();

    return (
        <div className="max-w-screen-xl py-16 px-4 grid lg:grid-cols-12 gap-8 mx-auto">
            <div className="md:col-span-8">
                <Image src={room.image} alt={room.name} width={770} height={430} priority className="w-full rounded-md mb-8" />
                <h1 className="text-xl font-bold text-ink mb-8">{room.name}</h1>
                <p className="text-ink-muted">{room.description}</p>
                <h5 className="text-lg font-bold py-1 mt-1 text-ink">Amenities:</h5>
                <div className="grid md:grid-cols-3">
                    {room.RoomAmenities.map((item) => (
                        <div className="flex gap-1 py-1" key={item.id}>
                            <IoCheckmark className="size-5 text-success" />
                            <span className="text-ink-muted">{item.Amenities.name}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="md:col-span-4">
                <div className="border border-primary px-3 py-5 bg-surface-2 rounded-md shadow-card">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2 text-ink-muted">
                            <IoPeopleOutline className="size-4" />
                            <span>
                                {room.capacity} {room.capacity === 1 ? "person" : "people"}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <span className="text-2xl font-bold text-ink">{formatCurrency(room.price)}</span>
                            <span className="text-ink-muted text-sm">/Night</span>
                        </div>
                    </div>
                    {/* Reservation Form */}
                    <ReserveForm room={room} disabledDate={disabledDate} />
                </div>
            </div>
        </div>
    )
}

export default RoomDetail
