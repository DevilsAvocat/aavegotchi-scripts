const axios = require('axios');

async function run(){

  try{

  var tokenId = 159;
  var time = 1625208364;
  var targetBRS = 554;
  //there are 604,800 seconds in a week
    const result = await axios.post(
      'https://api.thegraph.com/subgraphs/name/aavegotchi/aavegotchi-core-matic',
        {
          query: `
          {
                erc721Listings(first:1000,orderBy:priceInWei,orderDirection:desc, where:{category:3,timePurchased_gt:${time-604800},timePurchased_lt:${time+604800},baseRarityScore_gt:${targetBRS-2},baseRarityScore_lt:${targetBRS+2},modifiedRarityScore_gt:${targetBRS-2},modifiedRarityScore_lt:${targetBRS+2}}){
                    id
                    baseRarityScore
                    priceInWei
                  }
              }
              `
            }
          );
          //console.log(result)
      let resultsLength = result.data.data.erc721Listings.length;

        var i;
        var j;
        var totalPrice=BigInt(0);
        //here we find the average price
        for(i=0;i<resultsLength;i++)
        {
            let thisPrice = (BigInt(result.data.data.erc721Listings[i].priceInWei)/BigInt("1000000000000000000"));
            totalPrice = totalPrice + thisPrice;
            console.log(result.data.data.erc721Listings[i].id+" "+thisPrice)
        }
        let avgPrice = totalPrice/BigInt(resultsLength);
        console.log(avgPrice.toString(),"average price");



        }
        catch(err){
          console.log(err);
        }
        finally{

        }
    }



run()
