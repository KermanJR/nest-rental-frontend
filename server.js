const express = require('express');
const { resolve } = require('path');
const path = require('path')
const app = express();
const cors = require('cors');


app.use('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
})
    

app.use('*', 
    express.static(
        resolve(
            __dirname,
            'build'
        )
    )
)


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
})




app.listen(process.env.PORT || 3000, (err)=>{
    if(err){
        return console.log(err)
    }else{
        console.log('ok')
    }

})