"use client";

import { Button } from "@/ui/components/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/ui/components/form";
import { Input } from "@/ui/components/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/ui/components/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  marker: z
    .custom<FileList>()
    .refine((file) => file?.length == 1, "File is required.")
    .refine(
      (file) => file?.[0].type.startsWith("image/"),
      "File must be a valid image",
    ),
  model: z
    .custom<FileList>()
    .refine((file) => file?.length == 1, "File is required.")
    .refine((file) => file?.[0].name.endsWith(".glb"), "File must be a model."),
});

export type formType = z.infer<typeof formSchema>;

function FormCmp() {
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: handleNewMarker,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["markers"] });
    },
  });

  async function handleNewMarker(data: formType) {
    console.log(data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("marker", data.marker[0]);
    formData.append("model", data.model[0]);

    await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  const modelRef = form.register("model");
  const markerRef = form.register("marker");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">Add new marker</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>The marker name</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marker"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marker preview</FormLabel>
                  <FormControl>
                    <Input type="file" accept="image/*" {...markerRef} />
                  </FormControl>
                  <FormDescription>The Marker file</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input {...modelRef} type="file" />
                  </FormControl>
                  <FormDescription>The model file</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export default FormCmp;
