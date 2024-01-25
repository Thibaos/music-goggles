"use client";

import { api } from "~/trpc/react";

import { columns } from "./columns";
import { PostTable } from "./post-table";

export function ListPost() {
  const posts = api.post.getAll.useQuery();

  return (
    <div className="container mx-auto py-10">
      <PostTable columns={columns} data={posts.data ?? []} />
    </div>
  );
}
