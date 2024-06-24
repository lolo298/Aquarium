import { supabase } from "./supabase";
import { bucket } from "./env";

let write: ({ url, content }: { url: string; content: Uint8Array }) => Promise<string>,
  unlink: (url: string[]) => Promise<void>,
  read: (url: string) => Promise<Blob>;
/**
 * Write a file to the storage bucket and return the public url
 */
write = async ({ url, content }) => {
  const store = supabase.storage.from(bucket);
  const { data, error } = await store.upload(url, content, {
    upsert: true,
  });
  if (error || !data) {
    throw error;
  }
  console.log(data);
  return store.getPublicUrl(data.path).data.publicUrl;
};

/**
 * delete a file from the storage bucket
 */
unlink = async (url) => {
  await supabase.storage.from(bucket).remove(url);
};

/**
 * Read a file from the storage bucket
 */
read = async (url) => {
  const { data, error } = await supabase.storage.from(bucket).download(url);
  if (error || !data) {
    throw error;
  }
  return data;
};

export { unlink, write, read };
