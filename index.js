const fileSystem = require('fs');
const express = require('express');
 //var ins = require('point-in-polygon');
 var ins = require('point-in-geopolygon');
 const winston=require('winston');
const whiskers = require('whiskers') ;
const map=require('./sample-data.json');
const port = process.env.PORT||3600;
var x = [];

var data = fileSystem.readFileSync('sample-data.json', 'utf-8');
var Gis = JSON.parse(data.toString());

const app=express(); 
app.use(express.json());
console.log('--------------------------- NEW APP ');
app.use(function(req,res,next){
  console.log('middlewere!');
  next(); 
});
app.get('/', (req, res) => {
  console.log('start!');
  
});
Gis.features.forEach(function (feature) {
  x.push(feature);

});
//get 

 
app.get('/gis/testpoint', function (req, res) {
  let result = [];
  
  for (let i in map.features)  {
    if (ins.polygon( map.features[i].geometry.coordinates,[0,0])) {
      result.push(map.features[i].properties.name)
    }
   
  }
  res.json(result);
  
})
  
   

    //put
    app.put('/gis/addpolygon',(req,res)=>{
      try {
        x.push(req.body);
        res.sendStatus(200); 
      } catch (err) {
        res.sendStatus(400);
  
      }
     } )
     app.listen(port,()=>{
        console.log(`listening port ${port}`)
    })
