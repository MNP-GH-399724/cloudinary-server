const express = require('express');
const cloudinary = require('cloudinary').v2;
const bodyParser = require('body-parser')

const app = express();


//middlewares
app.use(express.static('public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


//clodinary configuration
cloudinary.config({ 
    cloud_name: 'dn5rxyzjo', 
    api_key: '686769132462363', 
    api_secret: 'wZvOez2prXtkgYA9-jKCrkKo-sQ' 
  });


//routes
app.get('/',(req,res)=> {
    res.send('welcome home page');
})

app.post('/image/upload',(req,res)=> {
    // user image
    const data = {
        image:req.body.image,
    }
    console.log(data);
    console.log('inside upload post');
    
    //upload image 
    cloudinary.uploader.upload(data.image)
    .then((result)=> {
        console.log('success');
        res.status(200).send({
            message: "Upload success..!",
            result,
        })
    }).catch((err)=> {
        console.log('failed');
        res.status(500).send({
            message: "Upload failed !!!!!",
            err,
        })
    })
})

const PORT = 3001;

app.listen(PORT,()=> {
    console.log(`server is running on port ${PORT}`);
})


module.exports = app