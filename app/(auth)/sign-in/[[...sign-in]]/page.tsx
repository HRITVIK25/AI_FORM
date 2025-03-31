"use client";
import dynamic from 'next/dynamic';

const NoSSRSignIn = dynamic(() => import('@clerk/nextjs').then((mod) => mod.SignIn), { ssr: false });

export default function SignInPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <NoSSRSignIn />
        </div>
    );
}
