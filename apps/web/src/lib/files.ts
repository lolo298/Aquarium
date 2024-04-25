import { put, del } from "@vercel/blob";
import fs from "fs/promises";

let init: () => Promise<void>,
  write: ({
    url,
    content,
  }: {
    url: string;
    content: Buffer;
  }) => Promise<string>,
  unlink: (url: string | string[]) => Promise<void>;

if (process.env.VERCEL) {
  write = async ({ url, content }) => {
    const { url: res } = await put(url, content, {
      access: "public",
    });
    return res;
  };

  init = async () => {};

  unlink = async (url) => {
    await del(url);
  };
} else {
  write = async ({ url, content }) => {
    await fs.writeFile(`public/${url}`, content);
    return url;
  };
  init = async () => {
    try {
      await fs.stat("public/uploads");
    } catch (e) {
      await fs.mkdir("public/uploads");
    }
  };
  unlink = async (url) => {
    if (Array.isArray(url)) {
      await Promise.all(url.map((u) => fs.unlink(`public/${u}`)));
    } else {
      await fs.unlink(`public/${url}`);
    }
  };
}

export { init, write, unlink };
