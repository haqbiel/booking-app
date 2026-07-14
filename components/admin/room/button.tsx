import { IoTrashOutline, IoPencil } from "react-icons/io5"
import { deleteRoom } from "@/lib/actions";
import Link from "next/link";

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link href={`/admin/room/edit/${id}`} className="rounded-sm p-1.5 hover:bg-surface-2 transition-colors duration-150">
            <IoPencil className="size-5 text-action" />
        </Link>
    );
};

export const DeleteButton = ({ id, image }: { id: string; image: string }) => {
    const DeleteRoomWithId = deleteRoom.bind(null, id, image);
    return (
        <form action={DeleteRoomWithId}>
            <button type="submit" className="rounded-sm p-1.5 hover:bg-error/10 transition-colors duration-150 cursor-pointer">
                <IoTrashOutline className="size-5 text-error" />
            </button>
        </form>
    );
};
