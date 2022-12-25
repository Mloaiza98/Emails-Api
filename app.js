const express = require ("express");
const bodyParse = require ("body-parser");
const https = require ("https");
const request = require("request");
const app = express();
const port = 3000;

app.use(express.static(__dirname));
app.use(bodyParse.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
     
})



app.post("/", function(req, res){
    


    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email= req.body.email;



    const sub = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME : firstname,
                    LNAME : lastname
                }
            }]
    }


    const jsonData = JSON.stringify(sub)
    
    const url = "https://us21.api.mailchimp.com/3.0/lists/744273f482"
    const options = {
            method: "POST",
            auth: "a:9398cdb0e21b19ba76d22aa1ade9d0eb-us21"
        }


    const request =  https.request(url, options, function(resp){
        
        if (resp.statusCode ===200){
            res.sendFile(__dirname+"/sucess.html")
        } 
        else{
            res.sendFile(__dirname+"/fail.html")
        }


    resp.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })
   
    request.write(jsonData)
    request.end()

    
})


app.listen(process.env.PORT || port, function(){
    console.log("Running port:"+ port)
    
})
// Api Keys 

// mailchaimps 
// 9398cdb0e21b19ba76d22aa1ade9d0eb-us21

// List ID 
// 744273f482



