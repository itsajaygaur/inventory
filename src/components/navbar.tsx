"use client"
import { Stack } from "@mui/joy";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/constant/data";


export default function Navbar(){
const path = usePathname()


    return(
        <nav className="bg-blue-50" >
            <Stack direction="row" spacing={4} className="max-w-4xl mx-auto px-5 sm:px-10 py-6" >
                {
                    navItems && navItems.map(item =>( 

                    <Link key={item.id} href={item.path} className={`${path === item.path ? 'font-bold underline' : ''} hover:underline text-lg` } >{item.title}</Link>

                    ))
                }
            </Stack>
        </nav>
    )
}