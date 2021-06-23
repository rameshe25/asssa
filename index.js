const express = require('express')
const cors =require("cors")
const morgan =require("morgan")
const swaggerUI=require("swagger-ui-express")


const port = 80;
const imageRouter = require("./routes/image")



const app = express();


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use("/image",imageRouter)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))