"use client";

import { Button } from "@/ui/components/button";
import { Card, CardContent, CardHeader } from "@/ui/components/card";
import { Checkbox } from "@/ui/components/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";
import Previewer from "@/ui/three/Previewer";
import type { getAllMarkers } from "@repo/db";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import React from "react";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type data = Awaited<ReturnType<typeof getAllMarkers>>[0];

export const columns: ColumnDef<data>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "preview.path",
    header: "Marker",
  },
  {
    accessorKey: "model.path",
    header: "Model",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(data.id)}
              >
                Copy Marker ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <DialogTrigger>Preview Marker</DialogTrigger>
              </DropdownMenuItem>
              <Delete marker={data} />
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Preview of {data.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>Marker</CardHeader>
                <CardContent className="relative">
                  <Image
                    src={data.marker.path}
                    alt="Marker"
                    width={400}
                    height={400}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>Model</CardHeader>
                <CardContent>
                  <Previewer modelSrc={data.model.path} />
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export function Delete({ marker }: { marker: data }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) =>
      fetch(`/api/markers/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["markers"] });
    },
  });

  return (
    <DropdownMenuItem
      onClick={() => {
        mutation.mutate(marker.id);
      }}
      className="group opacity-90"
      style={
        {
          "--accent": "var(--destructive)",
          "--accent-foreground": "var(--popover)",
        } as React.CSSProperties
      }
    >
      <Trash className="size-4 text-red-500 group-focus:text-inherit" />
      Delete
    </DropdownMenuItem>
  );
}
