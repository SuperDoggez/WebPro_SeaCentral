import { createBrowserClient } from '@supabase/ssr';


const index = `https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/sea-central/`
export const getIndex = (name:string) => `${index}${name}.png`


const activity = `https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/sea-central/activity/`
export const getActivity = (name:string) => `${activity}${name}.png`

const room = `https://dfmtboqfsygnjttfuvgq.supabase.co/storage/v1/object/public/sea-central/room/`
export const getRoom = (name:string) => `${room}${name}room.png`

const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

export const supabase = createClient()

export function isFile(value: any): value is File {
    return value instanceof File;
  }
  
export function isBlob(value: any): value is Blob {
    return value instanceof Blob;
  }


export const upLoadforMac = async (fileOrBlob: File | Blob | Buffer) => {
    if (!fileOrBlob) {
      throw new Error("No file or blob provided.");
    }
  
    try {
      const fileName = `/mac.jpg`;
      const filePath = `${fileName}`;
  
      const { error } = await supabase.storage
        .from("sea-central")
        .upload(filePath, fileOrBlob, {
          cacheControl: "3600"
        });
  
      if (error) {
        throw error;
      }
  
      const { data } = await supabase.storage.from("sea-central").getPublicUrl(filePath);
      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };
