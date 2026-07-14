import { getRooms } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import { DeleteButton } from "@/components/admin/room/button";
import { EditButton } from "@/components/admin/room/button";

const RoomTable = async () => {
    const rooms = await getRooms();
    if (!rooms?.length) return <p className="text-ink-muted">No Room Found</p>
    return (
        <div className="bg-canvas p-4 mt-5 shadow-card rounded-md border border-border">
            <table className="w-full divide-y divide-border">
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-primary uppercase text-left'>Image</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Room Name</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Price</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Created At</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase'>Action</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                    {rooms.map((room) => (
                        <tr className='hover:bg-surface-2 transition-colors duration-150' key={room.id}>
                            <td className='px-6 py-4'>
                                <div className="h-20 w-32 relative">
                                    <Image src={room.image} fill sizes="20vw" alt="room image" className="object-cover rounded-sm" />
                                </div>

                            </td>
                            <td className='px-6 py-4 text-ink'>
                                {room.name}
                            </td>
                            <td className='px-6 py-4 text-ink font-semibold'>
                                {formatCurrency(room.price)}
                            </td>
                            <td className='px-6 py-4 text-ink-muted'>
                                {formatDate(room.createdAt.toString())}
                            </td>
                            <td className='px-6 py-4 text-right'>
                                <div className="flex items-center justify-center gap-1">
                                    <EditButton id={room.id} />
                                    <DeleteButton id={room.id} image={room.image} />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoomTable
