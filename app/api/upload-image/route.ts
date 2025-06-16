import { storage } from '@/configs/firebaseConfig';
import { getApp } from 'firebase/app';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the incoming request
    const formData = await request.formData();
    const imageBase64 = formData.get('image') as string;
    
    if (!imageBase64) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }
    
    // Log configuration to help debug
    const app = getApp();
    console.log('Firebase Config:', {
      projectId: app.options.projectId,
      storageBucket: app.options.storageBucket,
    });
    
    // Generate a unique filename with timestamp
    const fileName = `Wireframe_To_Code/${Date.now()}.png`;
    const storageRef = ref(storage, fileName);
    
    console.log('Attempting to upload to:', storageRef.toString());
    
    // Upload the base64 image
    const uploadResult = await uploadString(storageRef, imageBase64, 'data_url');
    console.log('Upload successful:', uploadResult);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);
    console.log('Download URL:', downloadURL);
    
    // Return success with the download URL
    return NextResponse.json({ imageUrl: downloadURL });
  } catch (error) {
    console.error('Error uploading image:', error);
    // Return more detailed error information for debugging
    return NextResponse.json({ 
      error: 'Failed to upload image', 
      details: error instanceof Error ? error.message : String(error),
      code: error && typeof error === 'object' && 'code' in error ? error.code : 'unknown'
    }, { status: 500 });
  }
}
