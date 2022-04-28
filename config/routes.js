const Moralis  = require('moralis/node');

const serverUrl = "https://qzj6d4dxa9k9.usemoralis.com:2053/server";
const appId = "9QITUhfVHn3F2Pd2trRXx0oKxnJc4UWQCnbdMA4F";
const masterKey="hhLgmZkvvDbpR7Ejuj8rlHGEO3u6nXxiQJ0GUgA6";
Moralis.start({ serverUrl, appId, masterKey });

const express = require('express');
const routes = express.Router();
const bodyParser = require('body-parser');
const apimoralis = require('./apimoralis');
const rsa = require('node-rsa');
const fs = require('fs');
const { TIMEOUT } = require('dns');
const { json } = require('express/lib/response');


var publickey = new rsa();
var privatekey = new rsa();

var public = fs.readFileSync("./keys/public.pem");
var private = fs.readFileSync("./keys/private.pem");

publickey.importKey(public);
privatekey.importKey(private);

function Createlicense(){
  const saltFirst = "ajksdhsahgdikhsaldhsadhosadjopsaas";
  const saltSecond = "ajksdhsahgdikhs7634734djopsaas0097889";

  const encrypted = privatekey.encryptPrivate(saltFirst+saltSecond,"base64")
  return encrypted;
}



function CheckValidaty(license){
  const decrypt = publickey.decryptPublic(license,"utf8");
  if ("ajksdhsahgdikhsaldhsadhosadjopsaas"+"ajksdhsahgdikhs7634734djopsaas0097889" == decrypt) {
      return true;
  }else{
    return false;
  }
}

console.log(CheckValidaty(
  "Lrks9VvD0n06An+8Cw0Dk/5NDEVB6/O9eStleElrr8jSAqJks4TLtCbPKdHPCmd3k5mziU7pS5qQMs2PsxXVlpqz4RFvUvWjI7Mrj+LlXlpwXURwJjyIwmknNwedAVfA6wjHWY/j3uCikqoHhIs7DcyEM9P3Op+b17Zn4o+o2aZPzR+rLT9JLE3YvMxB5LgWj9lHNBf6mxh8bnEisJII2zkphJMfrD4bDEVj6c8xHCRyQ/C1MiAXyuww24ank8MHx48/adsefHkVKwdwYRVknrI2yZHRwePo/C635KAWxPHLJ3Rad5HpOAouvZpgwHv9lET2nCvdpeYzNn6kQe7n1w=="
));

function refresh() {
  window .location.reload();
}

routes.use(express.json());

(async () => { 
  
  routes.post('/player/build-loot/', function(request, response){
    console.log(request.body);
    console.log(request.body.userID)      // your JSON
     response.send(request.body);    // echo the result back
  });

  routes.get("/player/item/:idIten/:idPlayer",(req,res)=> { 
    try 
    {
      const fn = async(id) => 
      {
        console.log('Função iniciada...');
        const data = await apimoralis.GetItenPlayerConstruct(parseInt(req.params.idIten),parseInt(req.params.idPlayer));
        console.log(" aqui " + data);
        res.status(200).json(data);
          
      }
    fn(req.params.id); 
    } 
    catch (error) 
    {
         
    }

  });

  // ROTA DO SISTEMA DE LOGIN
  routes.get("/user/auth/:account/:passwordhash",(req,res)=> { 
    try 
    {
      const fn = async(account,passwordhash) => 
      {
        console.log('Função iniciada... ' + req.params.account + " " + req.params.passwordhash);
        const data = await apimoralis.Auth(req.params.account,req.params.passwordhash);
        console.log(" Player itens " + data);
        res.status(200).json(data);   
      }
    fn(req.params.id); 
    } 
    catch (error) 
    {
         
    }

  });
  // FIM DA ROTA DE SISTEMA DE LOGIN
  // ROTA DO USER DATA
  routes.get("/user/:playerName",(req,res)=> { 
    try 
    {
      const fn = async(playerName) => 
      {
        console.log('Função iniciada... ' + req.body.playerName);
        const data = await apimoralis.UserData(req.params.playerName);
        console.log(" Player itens " + data);
        res.status(200).json(data);   
      }
    fn(req.params.id); 
    } 
    catch (error) 
    {
         
    }

  });
  // FIM DA ROTA DO USER DATA
    // ROTA DO PLAYER DATA
    routes.post("/player/:playerName",(req,res)=> { 
      try 
      {
        const fn = async(playerName) => 
        {
          console.log('Função iniciada... ' + req.params.playerName);
          const data = await apimoralis.PlayerData(req.body.playerName);
          console.log(" Player itens " + data);
          res.status(200).json(data);   
        }
      fn(req.params.id); 
      } 
      catch (error) 
      {
           
      }
  
    });
    // FIM DA ROTA DO PLAYER DATA

   // ROTA DO BUILD LOT
   routes.post("/player/buildloot/",(req,res)=> { 
    try 
    {
      const fn = async(playerName) => 
      {
        console.log('Função iniciada... ' + req.params.playerName);
        //const data = await apimoralis.PlayerData(req.params.playerName);
        const data = await apimoralis.postPlayerBuildConstruct(req.body.Player,req.body.CategoryType,parseInt(req.body.IndexModelPrefabFixable),parseInt(req.body.Level),req.body.Location,parseInt(req.body.MaxLevel),req.body.OcupationList,parseInt(req.body.Price),parseInt(req.body.ProfitByDay),parseInt(req.body.Roi),parseInt(req.body.Wear));
        res.status(200).json();   
      }
    fn(req.params.id); 
    } 
    catch (error) 
    {
         
    }

  });
  // FIM DA ROTA DO BUILD LOT

  // ROTA DO BUY LOT  
  routes.post("/player/buy/buyloot/",(req,res)=> { 
    try 
    {
      const fn = async(playerName) => 
      {
        const data = await apimoralis.postPlayerBuyLot(req.body.Player,parseInt(req.body.Id), req.body.Coordinate,parseInt(req.body.TyleType),parseInt(req.body.IdOwner),parseInt(req.body.Price));
        res.status(200).json({info:"ok"});   
      }
  fn(req.body.Player); 
    } 
    catch (error) 
    {
         
    }

  });
  // FIM DA ROTA DO BUY LOT

    // ROTA DO VERIFY PLAYER CONSTRUCT
    routes.post("/player/construct/verify",(req,res)=> { 
      try 
      {
        const fn = async() => 
        {
          console.log(req.body.Player);
          const data = await apimoralis.PlayerVerify(req.body.Player);
          res.status(200).json(data);   
        }
    fn(); 
      } 
      catch (error) 
      {
           
      }
  
    });
    // FIM DA ROTA DO VERIFY PLAYER CONSTRUCT

    
    // ROTA UPDATE PLAYERSCC
    routes.post("/player/scc/update",(req,res)=> { 
      try 
      {
        const fn = async() => 
        {
          console.log(req.body.Player, req.body.LotPrice);

          var getSCC = await apimoralis.GetPlayerSCC(req.body.Player)
              console.log(getSCC[0].PlayerSCC)
            if (getSCC[0].PlayerSCC < parseInt(req.body.LotPrice)) {
              res.status(200).json({LotPrice:'Saldo insulficiente'});
           }else{
              getSCC[0].PlayerSCC = getSCC[0].PlayerSCC - parseInt(req.body.PlayerSCC);
              console.log(getSCC[0].PlayerSCC)
              const data = await apimoralis.SCCUpdate(req.body.Player,parseInt(getSCC[0].PlayerSCC));
              res.status(200).json(data); 
           }
            
        }
    fn(); 
      } 
      catch (error) 
      {
           
      }
  
    });
    // FIM DA ROTA DO VERIFY PLAYER CONSTRUCT
    
})();


module.exports = routes;
