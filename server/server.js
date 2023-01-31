const express =  require('express')
const cors = require("cors");
const router = require('./routes/index')

const app = express();
app.use(cors());

app.get('/', ((req,res) =>{
    res.status(200).json({message: 'Node server'})
}));

app.use('/items', router);
app.listen(8080);

