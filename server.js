const express = require('express');
const { resolve } = require('path');
const app = express();


app.use('/', 
    express.static(
        resolve(
            __dirname,
            './build'
        )
    )
)

app.use('*', 
    express.static(
        resolve(
            __dirname,
            './build'
        )
    )
)


const cors = require('cors');
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
})
app.post('/teste', (req, res)=>{
    var raw = JSON.stringify({
        "signer": {
          "email": "fulano@example.com",
          "phone_number": "11999999999",
          "auths": [
            "email"
          ],
          "name": "Marcos Zumba",
          "documentation": "123.321.123-40",
          "birthday": "1983-03-31",
          "has_documentation": true,
          "selfie_enabled": false,
          "handwritten_enabled": false,
          "official_document_enabled": false,
          "liveness_enabled": false,
          "facial_biometrics_enabled": false
        }
      });
      
      
      fetch("https://sandbox.clicksign.com/api/v1/signers?access_token=3c40d95b-ebb6-45cb-a179-6e8c76e513ba", {
          headers:{
              "Content-Type": "application/json"
          }, 
          method: 'POST',
          body:{
              raw
          }
      })
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
      
          console.log("Tudo ok")

          res.status.json({message:'ok'})

})



app.listen(process.env.PORT || 3000, (err)=>{
    if(err){
        return console.log(err)
    }else{
        console.log('ok')
    }

})