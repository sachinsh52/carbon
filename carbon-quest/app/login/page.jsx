"use client";

import { Input } from "@nextui-org/input";
import Link from "next/link";
import { Button } from "@nextui-org/react";

import { useRouter } from "next/navigation";

import { useState } from "react";
import { axiosInstanceWithoutToken } from "@/utils/axiosConfig";

export default function Login() {
  const router = useRouter();

  const [details, setDetails] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axiosInstanceWithoutToken({
        method: "POST",
        url: "/auth/login",
        data: details,
      });

      const { token, user } = data;

      localStorage.setItem("jwt", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  // return (
  //   <div className="flex">
  //     <section className="w-1/2 border-r grid place-items-center h-screen">
  //       <div>
  //         <div className="my-10 text-center">
  //           <h1 className="font-medium font-[impact] text-4xl">CarbonQuest</h1>
  //           <p>A Quest to Conqueror Carbon Emission.</p>
  //         </div>
  //         <form action="" className="flex flex-col gap-4">
  //           {/* <Link href="" className="text-blue-400 text-xs font-medium text-right">Forgot password?</Link> */}
  //           <Button onClick={handleLogin} color="primary" className="mt-3">
  //             Log In
  //           </Button>
  //           <p className="font-medium text-center text-xs">
  //             New to CarbonQuest?{" "}
  //             <Link href="/signup" className="text-blue-400">
  //               Sign Up
  //             </Link>{" "}
  //             here.
  //           </p>
  //         </form>
  //       </div>
  //     </section>
  //     <section className="w-1/2"></section>
  //   </div>
  // );

  return (
    <section className="md:flex md:h-screen justify-between">
      <div className="md:w-1/2 px-2 flex flex-col justify-center items-center gap-10 px-6 h-screen">
        <div className="text-center">
          <h1 className="font-medium font-protest text-4xl">CarbonQuest</h1>
          <p className="font-medium lowercase text-neutral-400">
            A Quest to Conqueror Carbon Emission.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4 w-full md:w-full"
        >
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
              Login
            </Button>
          </div>
          <p className="font-medium text-center text-xs">
              New to CarbonQuest?{" "}
              <Link href="/signup" className="text-blue-400">
                Sign Up
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
