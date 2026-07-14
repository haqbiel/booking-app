import Image from "next/image"
import { getReservationByUserId } from "@/lib/data"
import { notFound } from "next/navigation";
import { formatCurrency, formatDate } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import Link from "next/link";
import clsx from "clsx";

const MyReserveList = async () => {
    const reservation = await getReservationByUserId();
    if (!reservation) return notFound();

    return (
        <div>
            {reservation.map((item) => (
                <div className="bg-canvas shadow-card pb-4 mb-4 md:pb-0 relative rounded-md" key={item.id}>
                    <div className="flex items-center justify-between bg-surface-2 px-2 py-1 rounded-t-md">
                        <h1 className='text-sm font-medium text-ink truncate'>Reservaton ID: #{item.id}</h1>
                        <div className="flex gap-1 px-3 py-2 text-sm font-normal">
                            <span className="text-ink-muted">Status:</span>
                            <span className={clsx("font-bold uppercase px-2 py-0.5 rounded-sm text-xs", {
                                "bg-highlight text-highlight-ink": item.Payment?.status === "unpaid",
                                "bg-success text-white": item.Payment?.status === "success",
                                "bg-action text-white": item.Payment?.status === "pending",
                                "bg-error text-white": item.Payment?.status === "failure",
                            })}>{item.Payment?.status}</span>
                        </div>
                    </div>
                    <div className="flex flex-col mb-4 items-start bg-canvas rounded-md md:flex-row md:w-full">
                        <Image src={item.Room.image}
                            width={500} height={300} className="object-cover w-full rounded-t-md h-60 md:h-auto md:w-1/3 md:rounded-none md:rounded-s-md" alt="image room" />
                        <div className="flex items-center gap-1 mb-3 font-normal text-ink-muted w-full">
                            <div className="w-full p-4">
                                <div className="flex items-center justify-between text-sm font-medium text-ink truncate">
                                    <span>Price</span>
                                    <span className="font-bold">{formatCurrency(item.price)}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium text-ink truncate">
                                    <span>Arrival</span>
                                    <span>{formatDate(item.startDate.toISOString())}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium text-ink truncate">
                                    <span>Departure</span>
                                    <span>{formatDate(item.endDate.toISOString())}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium text-ink truncate">
                                    <span>Duration</span>
                                    <span>{differenceInCalendarDays(item.endDate, item.startDate)}
                                        <span className="ml-1">Night</span>
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm font-medium text-ink truncate">
                                    <span>Sub Total</span>
                                    <span className="font-bold">{item.Payment && formatCurrency(item.Payment.amount)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-end justify-end absolute inset-4">
                        {item.Payment?.status === "unpaid" ? (
                            <Link href={`/checkout/${item.id}`} className="px-6 py-1 bg-action text-white rounded-md hover:bg-action-hover transition-colors duration-200">Pay Now</Link>
                        ) : (
                            <Link href={`/myreservation/${item.id}`} className="px-5 py-1 bg-action text-white rounded-md hover:bg-action-hover transition-colors duration-200">View Detail</Link>
                        )}
                    </div>
                </div>
            ))}

        </div>
    )
}

export default MyReserveList
