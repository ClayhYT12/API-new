const { json } = require('express/lib/response');
const Moralis  = require('moralis/node');

const serverUrl = "https://qzj6d4dxa9k9.usemoralis.com:2053/server";
const appId = "9QITUhfVHn3F2Pd2trRXx0oKxnJc4UWQCnbdMA4F";
const masterKey="hhLgmZkvvDbpR7Ejuj8rlHGEO3u6nXxiQJ0GUgA6";
Moralis.start({ serverUrl, appId, masterKey });




 const GetItenPlayerConstruct = async(idIten,idPlayer)=>{
    //setTimeout(() => res(itemName), 2000);
    let arrDadosConstructItemPlayer = [];
    try {
      await new Promise((resolve) => setTimeout(resolve,1000));
      const PlayerItem = Moralis.Object.extend("PlayerItem");
      const query = new Moralis.Query(PlayerItem);
    
      query.equalTo("ItenID", idIten);
      query.equalTo("PlayerID", idPlayer);

      const results = await query.first();
      
      const PlayerID = results.get("PlayerID");
      const ItenID = results.get("ItenID");
      arrDadosConstructItemPlayer.push({
        PlayerID: PlayerID,
        ItenID: ItenID,
        });
      return arrDadosConstructItemPlayer;  
    } catch (error) {
      arrDadosConstructItemPlayer.push({
        error:"O player não possui este item"
      });
    }
}
// ROTA DE LOGIN API
const Auth = async(account,passwordhash)=>{
  //setTimeout(() => res(itemName), 2000);
  let arrDadosConstructItemPlayer = [];
  try {
    await new Promise((resolve) => setTimeout(resolve,1000));
    const user = await Moralis.User.logIn(account, passwordhash);
    console.log(user);
    return user;
  } catch (error) {
    arrDadosConstructItemPlayer.push({
      error:"O player não possui este item"
    });
  }
}
// FIM DA ROTA DO LOGIN
// ROTA DE DADOS DO PLAYER
const PlayerData = async(playerName)=>{
  //setTimeout(() => res(itemName), 2000);
  let arrPlayerData = [];
  try {
    await new Promise((resolve) => setTimeout(resolve,1000));
    const Player = Moralis.Object.extend("Player");
    const query = new Moralis.Query(Player);
    console.log("passei aqui");
    query.equalTo("PlayerName", "bobo123");
    
    const results = await query.first();
    
    const PlayerName = results.get("PlayerName");
    const PlayerProfession = results.get("PlayerProfession");
    const PlayerEducation = results.get("PlayerEducation");
    const PlayerSCC = results.get("PlayerSCC");
    const PlayerJoy = results.get("PlayerJoy");
    const PlayerHealth = results.get("PlayerHealth");
    const PlayerEnergy = results.get("PlayerEnergy");
    const PlayerExp = results.get("PlayerExp");
    console.log(PlayerName);
    arrPlayerData.push({
      PlayerName: PlayerName,
      PlayerProfession: PlayerProfession,
      PlayerEducation: PlayerEducation,
      PlayerSCC: PlayerSCC,
      PlayerJoy: PlayerJoy,
      PlayerHealth: PlayerHealth,
      PlayerEnergy: PlayerEnergy,
      PlayerExp: PlayerExp,
      });
    return arrPlayerData;  
  } catch (error) {
    arrPlayerData.push({
      error:"ocorreu algum erro na interface - PlayerData"
    });
  }
}
// FIM DA ROTA DO PLAYER

const GetItenPlayer = async(idPlayer)=>{
    //setTimeout(() => res(itemName), 2000);
    let arrDadosConstructItemPlayer = [];
    try {
      await new Promise((resolve) => setTimeout(resolve,1000));
      const PlayerItem = Moralis.Object.extend("PlayerItem");
      const query = new Moralis.Query(PlayerItem);
    
      query.equalTo("PlayerID", idPlayer);

      
      let i = 0;
      while(i < 5){
        const results = await query.first();
        console.log(results.length);
        query.equalTo("PlayerID", idPlayer);
        const itenID = query.equalTo("ItenID", i);
        console.log(itenID);
        //console.log("addadada" + results.get("ItenID"));

        i++;
      }

        
    } catch (error) {
      arrDadosConstructItemPlayer.push({
        error:"O player não possui este item"
      });
    }
}
  module.exports.GetItenPlayerConstruct = GetItenPlayerConstruct;
  module.exports.GetItenPlayer = GetItenPlayer;
  module.exports.Auth = Auth;
  module.exports.PlayerData = PlayerData;
 