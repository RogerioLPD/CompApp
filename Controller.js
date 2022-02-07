const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

let app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/',(req,res)=>{
    res.send(JSON.stringify(`Com o valor de ${req.body.price} você consegue comprar várias coisas`));
});

let port=process.env.PORT || 3000;
app.listen(port,(req,res)=>{
    console.log('Servidor Rodando');
});