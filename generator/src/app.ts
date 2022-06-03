import fs from "fs"; // Filesystem
import path from "path"; // Path routing
import Generator from "./generator"; // Generator
import { logger } from "./utils/logger"; // Logging

// Config file path
const configPath: string = path.join(__dirname, "../config.json");

/**
 * Throws error and exists process
 * @param {string} erorr to log
 */
function throwErrorAndExit(error: string): void {
  logger.error(error);
  process.exit(1);
}

(async () => {
  // Check if config exists
  if (!fs.existsSync(configPath)) {
    throwErrorAndExit("Missing config.json. Please add.");
  }

  // Read config
  const configFile: Buffer = await fs.readFileSync(configPath);
  const configData = JSON.parse(configFile.toString());
  const tokens = ["usdc","weth","link","gno","wxdai","wbtc"];
  // Check if config contains airdrop key
  for (let i in tokens){
    if (configData[tokens[i]] === undefined) {
        throwErrorAndExit(`Missing ${tokens[i]} param in config. Please add.`);
      }
      // Collect config
  const decimals: number = configData.decimals ?? 18;

  const airdrop: Record<string, number> = configData[tokens[i]];

  // Initialize and call generator
  const generator = new Generator(decimals, airdrop);
  await generator.process(tokens[i],);
  }

})();
