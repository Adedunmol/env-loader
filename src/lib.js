const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const config = async (envPath) => {
    const rootDir = getRootDir();

    if (!rootDir) return;

    const envFilePath = path.join(rootDir, ".env");

    if (!fsSync.existsSync(envFilePath) || !envPath) return;

    const fileHandle = await fs.open(envFilePath);

    console.log(envFilePath);
}

const getRootDir = () => {
    let currentDir = __dirname;

    while (!fsSync.existsSync(path.join(currentDir, "./package.json"))) {
        currentDir = path.join(currentDir, "..");
    }

    return currentDir
}

config();