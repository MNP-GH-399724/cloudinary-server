const express = require('express');
require('dotenv').config()
const cloudinary = require('./cloudinary/cloudinary.js');
const bodyParser = require('body-parser')


const app = express();


//middlewares
app.use(express.json({limit:'50mb'}))
//app.use(express.static('public'));
//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}))




//routes
app.get('/',(req,res)=> {
    res.send('<h2>welcome home page</h2>');
})

app.post('/image/upload',async(req,res)=> {
    // user image
        const {image} = req.body;
    console.log(image);
    console.log('inside upload post');
    
    //upload image 
    //const uploadedImages =image.map(async img=> {
        const upload = await cloudinary.uploader.upload(image,
            {
                upload_preset: 'unsigned_upload',
                allowed_formats : ['png', 'jpg', 'jpeg', 'svg', 'ico', 'jfif', 'webp'],
            },
            function (err,res) {
                if (err) {
                    console.log(err);
                }
            });
            console.log(upload,'==upload');
           // return upload
        //})
        
        // try {
        //     const fullFilled = await Promise.all(uploadedImages).then( vals=> {return vals})
        //     const publicIDS = fullFilled.map(image=> {
        //         console.log(image);
        //         return image.public_id
        //     })
        //   console.log(publicIDS);  
        //   res.status(200).json(publicIDS)
        // } catch (error) {
        //     res.status(500).json(error)
        // }

    // cloudinary.uploader.upload(data.image)
    // .then((result)=> {
    //     console.log('success');
    //     res.status(200).send({
    //         message: "Upload success..!",
    //         result,
    //     })
    // }).catch((err)=> {
    //     console.log('failed');
    //     res.status(500).send({
    //         message: "Upload failed !!!!!",
    //         err,
    //     })
    // })
})

const PORT = process.env.PORT||4140;

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`);
})


