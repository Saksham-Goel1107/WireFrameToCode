import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const formData = await request.formData();
    const imageBase64 = formData.get('image') as string;
    
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        imageBase64,
        {
          folder: 'wireframe-to-code',
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    // Return the Cloudinary URL
    return NextResponse.json({ 
      imageUrl: (uploadResult as any).secure_url,
      publicId: (uploadResult as any).public_id
    });
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    return NextResponse.json({ 
      error: 'Failed to upload image', 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
