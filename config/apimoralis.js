const { json } = require('express/lib/response');
const Moralis  = require('moralis/node');

const serverUrl = "https://qzj6d4dxa9k9.usemoralis.com:2053/server";
const appId = "9QITUhfVHn3F2Pd2trRXx0oKxnJc4UWQCnbdMA4F";
const masterKey="hhLgmZkvvDbpR7Ejuj8rlHGEO3u6nXxiQJ0GUgA6";
Moralis.start({ serverUrl, appId, masterKey });


// ROTAS DE SETAR DDOS DO BANCO
// ROTA DO BUILD CONSTRUCT
const postPlayerBuildConstruct = async(objectID,CategoryType,IndexModelPrefabFixable,Level,Location,MaxLevel,OcupationList,Price,ProfitByDay,Roi,Wear)=>{

  const PlayerItem = Moralis.Object.extend("PlayerItem");
  const playerItem = new PlayerItem();

  playerItem.set("objectId",objectID);
  playerItem.set("CategoryType",CategoryType);
  playerItem.set("IndexModelPrefabFixable",IndexModelPrefabFixable);
  playerItem.set("Level",Level);
  playerItem.set("Location",Location);
  playerItem.set("MaxLevel",MaxLevel);
  playerItem.set("OcupationList",OcupationList);
  playerItem.set("Price",Price);
  playerItem.set("ProfitByDay",ProfitByDay);
  playerItem.set("Roi",Roi);
  playerItem.set("Wear",Wear);

  const save= await playerItem.save(null,{useMasterKey:true});
  console.log(save);
}
// FIM DA ROTA DO BUILD CONSTRUCT

// ROTAS DE SETAR DDOS DO BANCO
const postPlayerBuyLot = async(PlayerName,Id,Coordinate,TyleType,IdOwner,Price)=>{

  const PlayerItem = Moralis.Object.extend("PlayerLoot");
  const playerItem = new PlayerItem();

  playerItem.set("PlayerName",PlayerName);
  playerItem.set("Id",Id);
  playerItem.set("Coordinate",Coordinate);
  playerItem.set("TyleType",TyleType);
  playerItem.set("IdOwner",IdOwner);
  playerItem.set("Price",Price);
  const save = await playerItem.save(null,{useMasterKey:true});
  console.log(save);
}

// ROTAS DE PEGAR DADOS DO BANCO

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
// ROTA DE DADOS DO USER
const UserData = async(playerName)=>{
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
// FIM DA ROTA DO USER

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

// ROTA DO  PLAYER VERIFY
const PlayerVerify = async(Player)=>{
  //setTimeout(() => res(itemName), 2000);
  let arrDadosConstructItemPlayer = [];
  try {
    await new Promise((resolve) => setTimeout(resolve,1000));
    const PlayerItem = Moralis.Object.extend("PlayerLoot");
    const query = new Moralis.Query(PlayerItem);

    //query.equalTo("PlayerName", Player);

    const results = await query.find();
    console.log("Aqui " + Player);
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      const object = results[i];
      console.log(object.get("Id") + " - " + object.get("PlayerName"));
      arrDadosConstructItemPlayer.push({
        Player: object.get("PlayerName"),
        ItenID: object.get("Id")
      });

    }
    return arrDadosConstructItemPlayer;  
  } catch (error) {
    arrDadosConstructItemPlayer.push({
      error:"O player não possui este item"
    });
    return arrDadosConstructItemPlayer;
  }
}
// FIM DA ROTA DO PLAYER VERIFY

// ROTA GET PLAYERSCC
const GetPlayerSCC = async(PlayerName)=>{
  //setTimeout(() => res(itemName), 2000);
  let arrDadosConstructItemPlayer = [];
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
    
    arrDadosConstructItemPlayer.push({
      PlayerSCC: PlayerSCC,
      });
      console.log(arrDadosConstructItemPlayer);
    return arrDadosConstructItemPlayer;  
  } catch (error) {
    arrDadosConstructItemPlayer.push({
      error:"Erro interno"
    });
    return arrDadosConstructItemPlayer;
  }
}
// FIM DA ROTA DO PLAYERSCC

// ROTA DO PLAYERSCC UPDATE
const SCCUpdate = async(Player,playerSCC)=>{
  //setTimeout(() => res(itemName), 2000);
  let arrDadosConstructItemPlayer = [];
  try {
    const PlayerItem = Moralis.Object.extend("Player");
    const query = new Moralis.Query(PlayerItem);
    query.equalTo("PlayerName", Player);

    const results = await query.first();
    console.log(results + " " + Player + " " + playerSCC);
    const NewPlayerSCC = results.set("PlayerSCC",playerSCC);
    const update= await results.save(null,{useMasterKey:true});
    console.log(update);
    arrDadosConstructItemPlayer.push({
      PlayerSCC: NewPlayerSCC,
      });
    return arrDadosConstructItemPlayer;  
  } catch (error) {
    arrDadosConstructItemPlayer.push({
      error:"Erro interno"
    });
    return arrDadosConstructItemPlayer;
  }
}
// FIM DA ROTA DO PLAYERSCC UPDATE


  module.exports.GetItenPlayerConstruct = GetItenPlayerConstruct;
  module.exports.GetItenPlayer = GetItenPlayer;
  module.exports.Auth = Auth;
  module.exports.UserData = UserData;
  module.exports.postPlayerBuyLot = postPlayerBuyLot;
  module.exports.postPlayerBuildConstruct = postPlayerBuildConstruct;
  module.exports.PlayerVerify = PlayerVerify;
  module.exports.GetPlayerSCC = GetPlayerSCC;
  module.exports.SCCUpdate = SCCUpdate;
 