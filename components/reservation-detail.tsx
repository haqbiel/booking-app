import { getReservationById } from "@/lib/data"
import { formatCurrency, formatDate } from "@/lib/utils"
import { differenceInCalendarDays } from "date-fns"
import { notFound } from "next/navigation"
import clsx from "clsx"

const ReservationDetail = async ({ reservationId }: { reservationId: string }) => {

    const reservation = await getReservationById(reservationId);
    if (!reservation) return notFound();

    return (
        <div className="w-full p-4 bg-canvas border border-border rounded-md shadow-card">
            <div className="grid md:grid-cols-2 md:gap-5">
                <ul>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Reservation ID</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink">#{reservation.id}</div>
                        </div>
                    </li>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Book Date</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink">{formatDate(reservation.createdAt.toISOString())}</div>
                        </div>
                    </li>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Name</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink">{reservation.User.name}</div>
                        </div>
                    </li>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Email</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink">{reservation.User.email}</div>
                        </div>
                    </li>
                </ul>
                <ul>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Phone Number</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink">{reservation.User.phone}</div>
                        </div>
                    </li>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Payment Method</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink capitalize">{reservation.Payment?.method ? reservation.Payment.method.replace("_", " ") : null}</div>
                        </div>
                    </li>
                    <li className='py-2'>
                        <div className="flex items-center">
                            <div className="flex-1 min-w-0 ms-4">
                                <p className='text-sm font-medium text-ink truncate'>Payment Status</p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold text-ink">{reservation.Payment?.status}</div>
                        </div>
                    </li>
                </ul>
            </div>
            {/* Table Responsive */}
            <div className="relative overflow-x-auto mt-3 py-6">
                <table className='w-full text-sm text-left text-ink-muted'>
                    <thead className='text-xs text-primary uppercase bg-surface-1'>
                        <tr>
                            <th className='px-6 py-3'>Room</th>
                            <th className='px-6 py-3 min-w-60 md:min-w-0'>Price</th>
                            <th className='px-6 py-3'>Arrival</th>
                            <th className='px-6 py-3'>Departure</th>
                            <th className='px-6 py-3 text-right'>Sub Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='bg-canvas border-b border-border'>
                            <td className='px-6 py-4'>
                                <div className="flex flex-col">
                                    <span className='font-medium text-ink whitespace-nowrap'>{reservation.Room.name}</span>
                                    <span className="text-ink-muted">Price: {formatCurrency(reservation.price)}</span>
                                </div>
                            </td>
                            <td className='px-6 py-4 text-ink-muted'>{formatDate(reservation.startDate.toISOString())}</td>
                            <td className='px-6 py-4 text-ink-muted'>{formatDate(reservation.endDate.toISOString())}</td>
                            <td className='px-6 py-4 text-ink-muted'>
                                {differenceInCalendarDays(reservation.endDate, reservation.startDate)} Night
                            </td>
                            <td className='px-6 py-4 text-right font-bold text-ink'>{reservation.Payment && formatCurrency(reservation.Payment.amount)}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='px-6 py-3 font-bold text-ink' colSpan={2}>Total</td>
                            <td className='px-6 py-3 font-bold text-right text-ink' colSpan={3}>{reservation.Payment && formatCurrency(reservation.Payment.amount)}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    )
}

export default ReservationDetail
