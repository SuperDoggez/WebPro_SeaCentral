import { NextResponse } from "next/server";
import { prismadb } from "@/lib/db";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
    try {
        const formdata = await req.formData()

        const image = formdata.get('image') as File
        const filename = `activity/waterskii.png`
        const filePath = `${filename}`;
        async function uploadImage(file: File) {
            try {
              const { error } = await supabase.storage
                .from('sea-central') 
                .upload(filePath, file, {
                  cacheControl: '3600',
                  upsert: false,
                });
          
              if (error) {
                throw error;
              }
              const { data } = await supabase.storage.from("sea-central").getPublicUrl(filePath);
              return data.publicUrl;
            } catch (error) {
              console.error('Error uploading image:', error);
              throw error;
            }
        }
        const img = await uploadImage(image)
        return NextResponse.json({
            image:img,
            message: "Upload image successfully"
        })
        
    } catch (error) {
        
        console.log(error);
        NextResponse.json({error})
        
    }
}