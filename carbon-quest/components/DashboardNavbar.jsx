
import Link from "next/link"

export default function DashboardNavbar() {
    return (
        <nav className="bg-transparent border-b-2 border-green-500/25 py-3 sticky top-0">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div className="logo">
                        <img src={"/carbon-quest-logo.jpeg"} className="w-32" />
                    </div>

                    <div className="flex gap-10 items-center">
                        <div>
                            <Link href="/dashboard" className="text-base">
                                Calender
                            </Link>
                        </div>
                        <div>
                            <Link href="/dashboard/track" className="gradient-btn px-5 py-2 font-bold rounded-full">
                                Track your day
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}