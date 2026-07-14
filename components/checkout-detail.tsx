import Image from "next/image";
import { getReservationById } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import PaymentButton from "@/components/payment-button";
import clsx from "clsx";

const CheckoutDetail = async ({ reservationId }: { reservationId: string }) => {
    const reservation = await getReservationById(reservationId);
    if (!reservation || !reservation.Payment) return <h1>No Reservation Found</h1>;

    const duration = differenceInCalendarDays(reservation.endDate, reservation.startDate)

    return (
        <div className="grid md:grid-cols-2 gap-5">
            <div className="order-2">
                <div className="flex flex-col mb-3 items-start bg-canvas border border-border rounded-md shadow-card md:flex-row md:w-full">
                    <div className="aspect-video relative">
                        <Image src={reservation.Room.image} width={500} height={300} className="object-cover w-full rounded-t-md aspect-video md:rounded-none md:rounded-s-md" alt="image" />
                    </div>
                    <div className="flex flex-col justify-between p-4 leading-normal w-full ">
                        <h5 className="mb-1 text-4xl font-bold text-ink">
                            {reservation.Room.name}
                        </h5>
                        <div className="flex items-center gap-1 text-2xl text-ink-muted">
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-2xl font-bold text-ink">
                                    {formatCurrency(reservation.price)}
                                </span>
                                <span>/ night</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Payment Button */}
                <PaymentButton reservation={reservation} />
            </div>
            <div className="border border-border px-3 py-5 bg-canvas rounded-md shadow-card">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="py-2 text-ink-muted">Reservation ID</td>
                            <td className="py-2 text-right truncate text-ink font-semibold">#{reservation.id}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Name</td>
                            <td className="py-2 text-right truncate text-ink">{reservation.User.name}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Email</td>
                            <td className="py-2 text-right truncate text-ink">{reservation.User.email}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Phone Number</td>
                            <td className="py-2 text-right truncate text-ink">{reservation.User.phone}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Arrival</td>
                            <td className="py-2 text-right truncate text-ink">{formatDate(reservation.startDate.toISOString())}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Departure</td>
                            <td className="py-2 text-right truncate text-ink">{formatDate(reservation.endDate.toISOString())}</td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Duration</td>
                            <td className="py-2 text-right truncate text-ink font-semibold"><span>{duration} {duration <= 1 ? "Night" : "Nights"}</span>
                            </td>

                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Amount in Rupiah</td>
                            <td className="py-2 text-right truncate text-ink font-bold"><span>
                                {formatCurrency(reservation.Payment.amount)}
                            </span>
                            </td>
                        </tr>
                        <tr>
                            <td className="py-2 text-ink-muted">Status</td>
                            <td className="py-2 text-right truncate">
                                <span className={clsx("px-2 py-1 rounded-sm text-xs font-bold uppercase", {
                                    "bg-highlight text-highlight-ink": reservation.Payment.status === "unpaid",
                                    "bg-success text-white": reservation.Payment.status === "success",
                                    "bg-action text-white": reservation.Payment.status === "pending",
                                    "bg-error text-white": reservation.Payment.status === "failure",
                                })}>{reservation.Payment.status}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CheckoutDetail
