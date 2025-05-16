"use client"

import { useRouter } from "next/navigation"
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';

export default function Profile({name}) {

    const router = useRouter()

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        router.push("/login")
    }

  return (
    <div className="px-4 py-3 rounded-lg fixed bottom-4 left-4 w-48 bg-gray-200/50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex justify-center items-center text-white">
          <Person2RoundedIcon />
        </div>
        <div className="flex flex-col gap-0">
            <h5 className="text-base font-bold">{name}</h5>
            <p onClick={handleLogout} className="text-blue-600 hover:underline text-sm cursor-pointer">Logout</p>
        </div>
      </div>
    </div>
  );
}
