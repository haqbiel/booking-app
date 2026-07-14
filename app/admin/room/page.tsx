import Link from "next/link";
import RoomTable from "@/components/admin/room/room-table";
import { Suspense } from "react";

const RoomPage = () => {
    return (
        <div className="max-w-screen-xl px-4 py-16 mt-10 mx-auto">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-bold text-primary">Room List</h1>
                <Link
                    href="/admin/room/create" className="bg-action px-6 py-2.5 hover:bg-action-hover text-white font-bold rounded-md transition-colors duration-200">Create New
                </Link>
            </div>
            <Suspense fallback={<p className="text-ink-muted">Loading Data...</p>}>
                <RoomTable />
            </Suspense>
        </div>
    );
};

export default RoomPage