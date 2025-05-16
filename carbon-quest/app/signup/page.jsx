"use client";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { useRouter } from "next/navigation";

import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";

export default function SignUp() {
  const [details, setDetails] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault(); // Important to prevent default form submission
    console.log("clicked"); // Add this log to check
    try {
      console.log("ENV API URL:", process.env.NEXT_PUBLIC_API_URL);
      await axiosInstanceWithoutToken({
        url: "/auth/register",
        method: "POST",
        data: details,
      });

      router.push("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="md:flex  md:h-screen justify-between">
      <div className="md:w-1/2  border-r flex flex-col justify-center items-center gap-10 px-6 h-screen">
        <div className="text-center">
          <h1 className="font-medium font-protest text-4xl">CarbonQuest</h1>
          <p className="font-medium lowercase text-neutral-400">
            A Quest to Conqueror Carbon .
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center gap-4 w-full md:w-full"
        >
          <Input
            type="text"
            label="name"
            className="md:w-[25rem]"
            value={details.name}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <Input
            type="text"
            label="username"
            className="md:w-[25rem]"
            value={details.username}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, username: e.target.value }))
            }
          />
          <Input
            type="email"
            label="email"
            className="md:w-[25rem]"
            value={details.email}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, email: e.target.value }))
            }
          />
          <Input
            type="password"
            label="password"
            className="md:w-[25rem]"
            value={details.password}
            onChange={(e) =>
              setDetails((prev) => ({ ...prev, password: e.target.value }))
            }
          />

          <div className="flex justify-center">
            <Button color="primary" className="mt-3 w-32" type="submit">
              Sign Up
            </Button>
          </div>
          <p className="font-medium text-center text-xs">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-400">
              Login
            </Link>{" "}
            here.
          </p>
        </form>
      </div>
      <div className="hidden md:block md:w-1/2 p-5">
        <img src="./env-card.jpg" className="w-full h-full rounded-xl" />
      </div>
    </section>
  );
}
