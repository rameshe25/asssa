const express = require('express')
const router = express.Router()
const compareImages = require("../api/compareImages");
const multer= require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

    const options = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.4,
            largeImageThreshold: 1200,
            useCrossOrigin: true,
            outputDiff: false
        },

        scaleToSameSize: true,
        ignore: "antialiasing"
    };
function tGen(tol){
    const val=(((tol/100)*70)/100)*255;
    const tolerance={
        red: val,
        green: val,
        blue: val,
        alpha:val,
        minBrightness: val,
        maxBrightness: 255-val,
    };
    options.tolerance=tolerance;
}
async function getDiff(options,image1,image2) {
    const data = await compareImages(
        image1,
        image2,
        options
    );
    data['image']=data.getImageDataUrl();
    return data;
}



router.post('/',upload.array('picture', 2), async (req,res)=> {

    const i1 = req.files[0]['buffer'];
    const i2 = req.files[1]['buffer'];
    tGen(req.body.tolerance);
    const result=await getDiff(options,i1,i2)
    return res.json(result);   
    //return res.send("<img src="+result['image']+">")
});
module.exports = router;
