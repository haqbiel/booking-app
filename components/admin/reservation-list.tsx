import { getReservations } from "@/lib/data";
import Image from "next/image";
import { formatDate, formatCurrency } from "@/lib/utils";
import clsx from "clsx";

const ReservationList = async () => {
    const reservation = await getReservations();
    if (!reservation?.length) return <p className="text-ink-muted">No Reservation Found</p>
    return (
        <div className="bg-canvas p-4 mt-5 shadow-card rounded-md border border-border">
            <table className="w-full divide-y divide-border">
                <thead>
                    <tr>
                        <th className='px-6 py-3 w-32 text-sm font-bold text-primary uppercase text-left'>Image</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Customer Name</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Arrival</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Departure</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Room Name</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Price</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase text-left'>Created At</th>
                        <th className='px-6 py-3 text-sm font-bold text-primary uppercase'>Payment Status</th>
                    </tr>
                </thead>
                <tbody className='divide-y divide-border'>
                    {reservation.map((reserve) => (
                        <tr className='hover:bg-surface-2 transition-colors duration-150' key={reserve.id}>
                            <td className='px-6 py-4'>
                                <div className="h-20 w-32 relative">
                                    <Image src={reserve.Room.image} fill sizes="20vw" alt="room image" className="object-cover rounded-sm" />
                                </div>

                            </td>
                            <td className='px-6 py-4 text-ink'>
                                {reserve.User.name}
                            </td>
                            <td className='px-6 py-4 text-ink-muted'>
                                {formatDate(reserve.startDate.toISOString())}
                            </td>
                            <td className='px-6 py-4 text-ink-muted'>
                                {formatDate(reserve.endDate.toISOString())}
                            </td>
                            <td className='px-6 py-4 text-ink font-medium'>
                                {reserve.Room.name}
                            </td>
                            <td className='px-6 py-4 text-ink font-semibold'>
                                {formatCurrency(reserve.price)}
                            </td>
                            <td className='px-6 py-4 text-ink-muted'>
                                {formatDate(reserve.createdAt.toString())}
                            </td>
                            <td className='px-6 py-4 text-right'>
                                <span className={clsx("px-2 py-1 rounded-sm text-xs font-bold uppercase", {
                                    "bg-highlight text-highlight-ink": reserve.Payment?.status === "unpaid",
                                    "bg-success text-white": reserve.Payment?.status === "success",
                                    "bg-action text-white": reserve.Payment?.status === "pending",
                                    "bg-error text-white": reserve.Payment?.status === "failure",
                                })}>{reserve.Payment?.status}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ReservationList
