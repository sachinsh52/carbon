import Link from "next/link";
import { ArrowDown02Icon } from "hugeicons-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <section className="md:h-screen p-5 w-full mt-8 max-w-[70rem] mx-auto">
        <h1 className="font-playfair text-6xl font-medium uppercase mb-6">
          Discover your Impact
        </h1>
        <div className="h-[32rem] w-full md:bg-neutral-400 overflow-hidden">
          <Image src="/download.jpeg" height={800} width={1200} />
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mt-4">
          <p className="max-w-[40rem]">
            Welcome to CarbonQuest, where you can easily track your carbon
            emissions and progress. Join us in the mission towards a greater
            future.
          </p>
          <Link
            href="/signup"
            className="border-2 border-black hover:bg-black hover:text-white transition px-4 py-2"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="h-screen mt-10 flex flex-col justify-center align-center bg-gradient-to-r from-green-300 to-green-400">
        <div className="md:w-[70rem] px-6 mx-auto">
          <div className="border-b pb-10 border-black">
            <h1 className="text-5xl font-playfair font-medium uppercase text-white">
              About carbonquest
            </h1>
            <p className="mt-8 max-w-[50rem] text-xl">
              At CarbonQuest, we are dedicated to empowering users to monitor
              and reduce their carbon footprint. Our platform offers a fun and
              rewarding experience to promote sustainable living.
            </p>
          </div>
        </div>
      </section>

      <section className="min-h-screen mb-[20rem]">
        <div className="w-full md:w-3/4 mx-auto">
          <h1 className="text-5xl font-medium font-playfair text-center mt-[5rem]">
            Why CarbonQuest?
          </h1>
          <div className="mt-16 flex flex-col gap-[6rem]">
            <div className="flex flex-col gap-8 md:flex-row gap-32 items-center justify-between">
              <div className="h-[25rem] md:w-[40rem] w-full relative">
                <Image src="/feature1.png" fill />
              </div>
              <div className="max-w-[24rem] p-4">
                <h2 className="font-medium leading-[26px] mb-4 text-3xl">
                  Personalized Carbon Insights
                </h2>
                <p className="text-neutral-500 text-justify leading-[22px] text-lg">
                  Analyse your day-to-day carbon footprint and make informative
                  decisions about your lifestyle that save the world by
                  answering simple quesionts.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8 md:flex-row gap-32 items-center justify-between">
              <div className="max-w-[24rem] md:w-[40rem] w-full relative p-4">
                <h2 className="font-medium leading-[26px] mb-4 text-3xl">
                  Interactive Visualizations
                </h2>
                <p className="text-neutral-500 text-justify leading-[22px] text-lg">
                  With visually stunning elements, you can easily understand
                  where your biggest carbon contributions come from, making it
                  easier to target areas for improvement.
                </p>
              </div>
              <div className="h-[25rem] md:w-[40rem] w-full relative">
                <Image src="/feature2.jpeg" fill />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-[20rem] max-w-[70rem] mx-auto flex flex-col items-center justify-between">
        <div>
          <h1 className="text-6xl font-playfair font-bold text-center bg-clip-text text-transparent text-center bg-gradient-to-b from-green-900 to-[#66cc00]">
            Small Steps, Big Impact—Track, Learn, and Reduce Your Carbon
            Footprint Today!
          </h1>
        </div>
      </section>

      <Footer />
    </>
  );
}
