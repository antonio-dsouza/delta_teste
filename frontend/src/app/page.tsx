"use client";
import NavBar from "@components/navegation/NavBar";
import StudentChart from "@components/chart/StudentChart";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="mt-10 flex flex-col items-center justify-center">
        <h1 className="font-semibold mb-4 text-xl">Dashboard de Estudantes</h1>
        <div className="w-full max-w-4xl h-96">
          <StudentChart />
        </div>
      </div>
    </>
  );
}
