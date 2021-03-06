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


(async () => { 
  
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
  routes.get("/player/auth/:account/:passwordhash",(req,res)=> { 
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
  // ROTA DO PLAYER DATA
  routes.get("/player/:playerName",(req,res)=> { 
    try 
    {
      const fn = async(playerName) => 
      {
        console.log('Função iniciada... ' + req.params.playerName);
        const data = await apimoralis.PlayerData(req.params.playerName);
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

    
})();

routes.use(express.json());
module.exports = routes;
