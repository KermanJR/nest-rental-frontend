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

if (process.env.NODE_ENV === "production") {
    app.use(express.static("build"));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, "./build/index.html"));
    });
  }
  
  else {
    app.use(express.static(path.join(__dirname, '/public')));
    app.get("/*", function(req, res) {
      res.sendFile(path.join(__dirname, ".public/index.html"));
    });
  }

app.listen(process.env.PORT || 3000, (err)=>{
    if(err){
        return console.log(err)
    }

    console.log("Tudo ok")
})