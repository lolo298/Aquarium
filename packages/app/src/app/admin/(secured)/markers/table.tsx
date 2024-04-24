import { Button } from "@/ui/components/button";
import Form from "./form";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/ui/components/table";
import type { getAllMarkers } from "@repo/db";
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/components/popover";
import { useQuery } from "@tanstack/react-query";

function TableCmp() {
  const query = useQuery<Awaited<ReturnType<typeof getAllMarkers>>>({
    queryKey: ["markers"],
    queryFn: async () => await fetch("/api/markers").then((res) => res.json()),
  });

  return (
    <>
      <div className="flex justify-end">
        <Form />
      </div>
      <Table>
        <TableCaption>A list of actives markers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Model</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data?.map((marker) => (
            <TableRow key={marker.id}>
              <TableCell className="font-medium">{marker.name}</TableCell>
              <TableCell>{marker.marker.path}</TableCell>
              <TableCell>{marker.model.path}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default TableCmp;
