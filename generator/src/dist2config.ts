import fs from "fs"; // Filesystem
import path from "path"; // Path
import keccak256 from "keccak256"; // Keccak256 hashing
import MerkleTree from "merkletreejs"; // MerkleTree.js
import { logger } from "./utils/logger"; // Logging
import { getAddress, parseUnits, solidityKeccak256 } from "ethers/lib/utils"; // Ethers utils

// dist file path
const distPath: string = path.join(__dirname, "../distribution.json");

// Output file path
const outputPath: string = path.join(__dirname, "../config.json");

interface User extends Record<string, any> {
  "user": string,
  "usdc": Number,
  "weth": Number,
  "link": Number,
  "gno": Number,
  "wxdai": Number,
  "wbtc": Number
}

type Config = { 
  [token: string]: TokenUsers | string; 
};
type TokenUsers = { 
  [user: string]: string; 
}

(async () => {
  // Check if dist exists
  let obj : Config = {};
  // Read dist
  const distFile: Buffer = await fs.readFileSync(distPath);
  const distData : User[] = JSON.parse(distFile.toString());
  const tokens = ["usdc","weth","link","gno","wxdai","wbtc"];
  
  obj["decimals"] = "0",

  tokens.forEach(tok => {
    let tokDist: TokenUsers = {};
    distData.forEach(user => {
      if (user["user"] && Number(user[tok]) > 0){
        tokDist[user["user"]] = user[tok].toString()
      }
    })
      obj[tok] = tokDist;
  })
  console.log(obj);


  // Collect and save merkle tree + root
  await fs.writeFileSync(
    // Output to merkle.json
    outputPath,
    // Root + full tree
    JSON.stringify(
      obj
    )
  );

})();

