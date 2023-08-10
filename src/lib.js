const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");

const config = async (envPath) => {
    const rootDir = getRootDir();
    let envFilePath;

    if (envPath) {
        envFilePath = envPath;
    } else {
        envFilePath = path.join(rootDir, ".env");
    }

    if (!fsSync.existsSync(envFilePath) || !fsSync.existsSync(envPath)) return;

    const fileHandle = await fs.open(envFilePath);

    for await (const line of fileHandle.readLines()) {
        console.log(line);
    }

}

const getRootDir = () => {
    let currentDir = __dirname;

    while (!fsSync.existsSync(path.join(currentDir, "./package.json"))) {
        currentDir = path.join(currentDir, "..");
    }

    return currentDir
}

config("../.env_new");