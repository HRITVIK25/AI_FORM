"use client"
import dynamic from "next/dynamic"

const NoSSRSignUp = dynamic(() => import('@clerk/nextjs').then((mod) => mod.SignUp), { ssr: false });


export default function signup() {
    return (
        <div >
            <NoSSRSignUp />
        </div>
    );
}