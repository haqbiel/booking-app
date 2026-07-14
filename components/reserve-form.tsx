"use client"
import { useActionState, useState } from "react";
import { addDays } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { createReserve } from "@/lib/actions";
import { RoomDetailProps, DisabledDateProps } from "@/types/room";
import clsx from "clsx";

const ReserveForm = ({
    room,
    disabledDate

}: {
    room: RoomDetailProps
    disabledDate: DisabledDateProps[]
}) => {
    const StartDate = new Date();
    const EndDate = addDays(StartDate, 1);

    const [startDate, setStartDate] = useState(StartDate);
    const [endDate, setEndDate] = useState(EndDate);

    const handleDateChange = (dates: [Date | null, Date | null]) => {
        const [start, end] = dates;
        setStartDate(start ?? StartDate);
        setEndDate(end ?? EndDate);
    }

    const [state, formAction, isPending] = useActionState(createReserve.bind(null, room.id, room.price, startDate, endDate), null)

    const excludeDates = disabledDate.map((item) => {
        return {
            start: item.startDate,
            end: item.endDate
        }
    })

    return (
        <div>
            <form action={formAction}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-ink">Arrival - Departure</label>
                    <DatePicker
                        selected={startDate}
                        startDate={startDate}
                        endDate={endDate}
                        minDate={new Date()}
                        selectsRange={true}
                        onChange={handleDateChange}
                        excludeDateIntervals={excludeDates}
                        dateFormat={"dd-MM-yyyy"}
                        wrapperClassName="w-full"
                        className="py-2 px-4 rounded-md border border-border w-full bg-canvas text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-error mt-2">{state?.messageDate}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-ink">Your Name</label>
                    <input type="text" name="name" className="py-2 px-4 rounded-md border border-border w-full bg-canvas text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Full Name..." />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-error mt-2">{state?.error?.name}</p>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-semibold text-ink">Phone Number</label>
                    <input type="text" name="phone" className="py-2 px-4 rounded-md border border-border w-full bg-canvas text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Phone Number..." />
                    <div aria-live="polite" aria-atomic="true">
                        <p className="text-sm text-error mt-2">{state?.error?.phone}</p>
                    </div>
                </div>
                <button type="submit" className={clsx("px-10 py-3 text-center font-semibold text-white w-full bg-action rounded-sm cursor-pointer hover:bg-action-hover transition-colors duration-200", {
                    "opacity-50 cursor-progress": isPending,
                })} disabled={isPending}>
                    {isPending ? "Loading..." : "Reserve"}
                </button>
            </form>
        </div>
    )
};

export default ReserveForm;
