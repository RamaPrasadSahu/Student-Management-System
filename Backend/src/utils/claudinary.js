import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


    // Configuration
    cloudinary.config({ 
        cloud_name: CLOUDINARY_CLOUD_NAME, 
        api_key: CLOUDINARY_CLOUD_KEY, 
        api_secret: CLOUDINARY_CLOUD_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    const uploadoncloudinary = async (localfilepath) =>{
        try {
            if(!localfilepath){
                return null
            }
            const response = await cloudinary.uploader.upload(localfilepath,{
                resource_type:"auto"
            })
            fs.unlinkSync(localfilepath)
            return response;
        } catch (error) {
            fs.unlinkSync(localfilepath)
            return null;
        }
    }

    export {uploadoncloudinary}

// const uploadOnCloudinary = async (localfilepath) =>{
//     try {
//         if(!localfilepath) return null;
//         const response = await cloudinary.uploader.upload(localfilepath,{
//             resource_type:"auto"
//         })
//         fs.unlinkSync(localfilepath)
//         return response;
//     } catch (error) {
//         fs.unlinkSync(localfilepath);
//         return null;
//     }
// }
// export {uploadOnCloudinary}