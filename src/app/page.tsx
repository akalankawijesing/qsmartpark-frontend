import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to Our Application
        </h1>
        <p className="text-lg text-gray-600 text-center sm:text-left">
          This is a sample application demonstrating protected routes and role-based access.
        </p>
      </main>
    </div>
  );
}
