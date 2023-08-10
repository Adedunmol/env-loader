const fsSync = require("fs");
const path = require("path");

const config = (envPath) => {
    let envFilePath;

    if (envPath) {
        envFilePath = envPath;
    } else {
        const rootDir = getRootDir();
        envFilePath = path.join(rootDir, ".env");
    }

    if (!fsSync.existsSync(envFilePath)) return;

    const data = fsSync.readFileSync(envFilePath, "utf-8");
    const lines = data.split("\n")

    lines.forEach((line) => {
        let {key, value} = splitEnvVars(line);
        
        process.env[key] = value;
    })
}

const getRootDir = () => {
    let currentDir = __dirname;

    while (!fsSync.existsSync(path.join(currentDir, "./package.json"))) {
        currentDir = path.join(currentDir, "..");
    }

    return currentDir
}

const splitEnvVars = (line) => {
    const values = line.split("=");

    let [key, value] = values

    return { key: key.trim(), value: value.trim()}
}

module.exports = {
    config,
}