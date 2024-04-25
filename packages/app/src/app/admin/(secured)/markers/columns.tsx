"use client";

import { getAllMarkers } from "@repo/db";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";
import { Button } from "@/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/ui/components/dialog";
import React from "react";
import { Card, CardHeader, CardContent } from "@/ui/components/card";
import Image from "next/image";
import Previewer from "@/ui/three/Previewer";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type data = Awaited<ReturnType<typeof getAllMarkers>>[0];

export const columns: ColumnDef<data>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "marker.path",
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
              <DropdownMenuItem
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
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Preview of {row.original.name}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>Marker</CardHeader>
                <CardContent className="relative">
                  <Image
                    src={row.original.preview.path}
                    alt="Marker"
                    width={400}
                    height={400}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>Model</CardHeader>
                <CardContent>
                  <Previewer modelSrc={row.original.model.path} />
                </CardContent>
              </Card>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
