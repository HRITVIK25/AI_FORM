import Logo from "@/components/Logo";
import { DarkMode } from "@/components/DarkMode";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import DashboardSidebar from "@/components/Sidebar"; 
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
        <div className="border-b">
            {/* Navbar  */}
            <nav className="flex items-center justify-between max-w-7xl mx-auto py-2">
            <Logo />
            <div className="flex items-center gap-2">
                <Link href={"/dashboard/forms"}>
                {" "}
                <Button variant={"link"}>Dashboard</Button>
                </Link>
                <UserButton afterSignOutUrl="/sign-in" />
                <DarkMode /> 
            </div>
            </nav>
        </div>
        <SidebarProvider>
        <DashboardSidebar />
        <main className="mx-6 my-4 w-full">{children}</main>
        </SidebarProvider>
        </div>
    );
};

export default layout;