import { put, del } from "@vercel/blob";
import fs from "fs/promises";
import { supabase } from "./supabase";

const bucket = process.env.ENV === "dev" ? "uploadsDev" : "uploads";

let init: () => Promise<void>,
  write: ({ url, content }: { url: string; content: Buffer }) => Promise<string>,
  unlink: (url: string[]) => Promise<void>,
  read: (url: string) => Promise<Buffer>;

write = async ({ url, content }) => {
  const store = supabase.storage.from(bucket);
  const { data, error } = await store.upload(url, content);
  if (error || !data) {
    throw error;
  }
  console.log(data);
  return store.getPublicUrl(data.path).data.publicUrl;
};

init = async () => {};

unlink = async (url) => {
  await supabase.storage.from(bucket).remove(url);
};

export { init, write, unlink, read };