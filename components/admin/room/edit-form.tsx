"use client";
import { useRef, useState, useTransition } from "react";
import { useActionState } from "react";
import { updateRoom } from "@/lib/actions";
import { type PutBlobResult } from "@vercel/blob";
import { IoCloudUploadOutline, IoTrashOutline } from "react-icons/io5"
import Image from "next/image";
import { BarLoader } from "react-spinners";
import { Amenities } from "@prisma/client";
import { RoomProps } from "@/types/room";
import clsx from "clsx";

const EditForm = ({
    amenities,
    room,
}: {
    amenities: Amenities[];
    room: RoomProps;
}) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const [image, setImage] = useState(room.image);
    const [message, setMessage] = useState("");
    const [pending, startTransition] = useTransition();

    const handleupload = () => {
        if (!inputFileRef.current?.files) return null;
        const file = inputFileRef.current.files[0];
        const formData = new FormData;
        formData.set("file", file);
        startTransition(async () => {
            try {
                const response = await fetch("/api/upload", {
                    method: "PUT",
                    body: formData
                });
                const data = await response.json();
                if (response.status !== 200) {
                    setMessage(data.message);
                }
                const img = data as PutBlobResult;
                setImage(img.url)
            } catch (error) {
                console.log(error);
            }
        });
    }

    const deleteImage = (image: string) => {
        startTransition(async () => {
            try {
                await fetch(`/api/upload/?imageUrl=${image}`, {
                    method: "DELETE"
                });
                setImage("")
            }
            catch (error) {
                console.log(error);
            }
        })
    }

    const [state, formAction, isPending] = useActionState(updateRoom.bind(null, image, room.id), null);

    const checkedAmenities = room.RoomAmenities.map((item) => item.amenitiesId);

    return (
        <form action={formAction}>
            <div className="grid md:grid-cols-12 gap-5">
                <div className="col-span-8 bg-canvas p-4 rounded-md shadow-card border border-border">
                    <div className="mb-4">
                        <input type="text" name="name"
                            defaultValue={room.name} className="py-2 px-4 rounded-md border border-border w-full bg-surface-1 text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Room Name..." />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-error mt-2">{state?.error?.name}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <textarea name="description" rows={8} defaultValue={room.description} className="py-2 px-4 rounded-md border border-border w-full bg-surface-1 text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Description"></textarea>
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-error mt-2">{state?.error?.description}</span>
                        </div>
                    </div>
                    <div className="mb-4 grid md:grid-cols-3">
                        {amenities.map((item) => (
                            <div className="flex items-center mb-4" key={item.id}>
                                <input type="checkbox" name="amenities" defaultValue={item.id} defaultChecked={checkedAmenities.includes(item.id)} className="w-4 h-4 text-action bg-surface-1 border-border rounded accent-action" />
                                <label className="ms-2 text-sm font-medium text-ink capitalize">
                                    {item.name}
                                </label>
                            </div>
                        ))}


                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-error mt-2">{state?.error?.amenities}</span>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 bg-canvas p-4 rounded-md shadow-card border border-border">
                    <label htmlFor="input-file" className="flex flex-col mb-4 items-center justify-center aspect-video border-2 border-border border-dashed rounded-md cursor-pointer bg-surface-1 relative">
                        <div className="flex flex-col items-center justify-center text-ink-muted pt-5 pb-6 z-10">
                            {pending ? <BarLoader /> : null}
                            {image ? (
                                <button type="button" onClick={() => deleteImage(image)} className="flex items-center justify-center bg-error size-6 rounded-sm absolute right-1 top-1 text-white hover:bg-error/80 transition-colors duration-200">
                                    <IoTrashOutline className="size-4 text-white" />
                                </button>
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <IoCloudUploadOutline className="size-8" />
                                    <p className="mb-1 text-sm font-bold text-ink">Select Image</p>
                                    {message ? (
                                        <p className="text-xs text-error">{message}</p>
                                    ) : (
                                        <p className="text-xs text-ink-subdued">SVG, PNG, JPG, GIF, or Others (Max: 4MB)</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {!image ? (
                            <input type="file" ref={inputFileRef} onChange={handleupload} id="input-file" className="hidden" />
                        ) : (
                            <Image src={image} alt="image" width={640} height={360} className="rounded-md absolute aspect-video object-cover" />
                        )}

                    </label>
                    <div className="mb-4">
                        <input type="text" name="capacity" defaultValue={room.capacity} className="py-2 px-4 rounded-md border border-border w-full bg-surface-1 text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Capacity..." />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-error mt-2">{state?.error?.capacity}</span>
                        </div>
                    </div>
                    <div className="mb-4">
                        <input type="text" name="price" defaultValue={room.price} className="py-2 px-4 rounded-md border border-border w-full bg-surface-1 text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Price..." />
                        <div aria-live="polite" aria-atomic="true">
                            <span className="text-sm text-error mt-2">{state?.error?.price}</span>
                        </div>
                    </div>
                    {/* General Message */}
                    {state?.message ? (
                        <div className="mb-4 bg-error/10 p-2 rounded-md">
                            <span className="text-sm text-error">{state.message}</span>
                        </div>
                    ) : null}
                    <button type="submit" className={clsx("bg-action text-white w-full hover:bg-action-hover py-2.5 px-6 md:px-10 text-lg font-semibold cursor-pointer transition-colors duration-200 rounded-md", {
                        "opacity-50 cursor-progress": isPending,
                    })} disabled={isPending}>{isPending ? "Updating..." : "Update"}</button>
                </div>
            </div>
        </form>
    )
}

export default EditForm
