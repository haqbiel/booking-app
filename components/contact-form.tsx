"use client";
import { useActionState } from "react";
import { ContactMessage } from "@/lib/actions";
import clsx from "clsx";

const ContactForm = () => {
    const [state, formAction, isPending] = useActionState(ContactMessage, null)
    return (
        <div className="bg-canvas p-8 rounded-md shadow-card">
            {state?.message ? (
                <div className="p-4 mb-4 text-sm text-success rounded-lg bg-success/10" role="alert">
                    <div className="font-medium">{state.message}</div>
                </div>
            ) : null}
            <form action={formAction}>
                <div className="grid md:grid-cols-2 gap-7 mt-6">
                    <div>
                        <input type="text" name="name" className="bg-surface-1 p-3 border border-border rounded-md w-full text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Name*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-error mt-2">{state?.error?.name}</p>
                        </div>
                    </div>
                    <div>
                        <input type="email" name="email" className="bg-surface-1 p-3 border border-border rounded-md w-full text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="johndoe@example.com*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-error mt-2">{state?.error?.email}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <input type="text" name="subject" className="bg-surface-1 p-3 border border-border rounded-md w-full text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Subject*" />
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-error mt-2">{state?.error?.subject}</p>
                        </div>
                    </div>
                    <div className="md:col-span-2">
                        <textarea name="message" rows={5} className="bg-surface-1 p-3 border border-border rounded-md w-full text-ink focus:ring-2 focus:ring-action focus:outline-none transition-all duration-200" placeholder="Your Message*"></textarea>
                        <div aria-live="polite" aria-atomic="true">
                            <p className="text-sm text-error mt-2">{state?.error?.message}</p>
                        </div>
                    </div>
                </div>
                <button type="submit" className={clsx("px-10 py-4 text-center font-semibold text-white w-full bg-action rounded-sm hover:bg-action-hover transition-colors duration-200 cursor-pointer", {
                    "opacity-50 cursor-progress animated-pulse": isPending,
                })} disabled={isPending}>{isPending ? "Loading..." : "Send Message"}</button>
            </form>

        </div>
    );
};

export default ContactForm
