"use client";

import { ColumnDef } from "@tanstack/react-table";

import type { Post } from "~/server/db/schema";

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "createdById",
    header: "Creator ID",
  },
  {
    accessorKey: "createdAt",
    header: "Creation date",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];
