import { unstable_noStore as noStore } from "next/cache";

import { ListPost } from "~/app/_components/list-post";

export default async function Home() {
  noStore();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Music
        </h1>

        <ListPost />
      </div>
    </main>
  );
}
