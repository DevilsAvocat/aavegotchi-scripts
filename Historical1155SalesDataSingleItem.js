const axios = require('axios');

async function run(){

  try{

  var tokenId = 49;
  var time = 1625208364;
  //there are 604,800 seconds in a week
    const result = await axios.post(
      'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic',
        {
          query: `
          {
  erc1155Purchases(orderBy:timeLastPurchased,orderDirection:desc,where:{timeLastPurchased_gt:${time-1604800},timeLastPurchased_lt:${time+1604800},category:0,erc1155TypeId:${tokenId}}){
                id
                listingID
                priceInWei
                timeLastPurchased
                erc1155TypeId
              }
}
              `
            }
          );

      let resultsLength = result.data.data.erc1155Purchases.length;
      if(resultsLength!=0){
        var i;
        var j;
        var totalPrice=BigInt(0);
        //here we find the average price
        for(i=0;i<resultsLength;i++)
        {
            let thisPrice = (BigInt(result.data.data.erc1155Purchases[i].priceInWei)/BigInt("1000000000000000000"));
            totalPrice = totalPrice + thisPrice;
            console.log(thisPrice+"  "+result.data.data.erc1155Purchases[i].listingID)
        }
        let avgPrice = totalPrice/BigInt(resultsLength);
        console.log(avgPrice,"average price");

      }
      else{console.log("no sales in time frame")}

        }
        catch(err){
          console.log(err);
        }
        finally{

        }
    }



run()
