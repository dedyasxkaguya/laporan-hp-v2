import {v2 as cloudinary} from 'cloudinary'

cloudinary.config({
    cloud_name:process.env.CLD_CLOUD,
    api_key:process.env.CLD_API,
    api_secret:process.env.CLD_SECRET
})

export default cloudinary