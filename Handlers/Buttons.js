const { resolve } = require("path");
const { readdir } = require("fs").promises;
const { EmbedBuilder } = require("discord.js");
const chalk = require("chalk");

module.exports = (client) => {
    async function getFiles(dir) {
        const dirents = await readdir(dir, { withFileTypes: true });
        const files = await Promise.all(
            dirents.map((dirent) => {
                const res = resolve(dir, dirent.name);
                return dirent.isDirectory() ? getFiles(res) : res;
            })
        );
        return Array.prototype.concat(...files);
    }

    async function run() {
        const files = await getFiles("./Buttons/");
        const jsFiles = files.filter((f) => f.split(`.`).pop() === "js");
        if (jsFiles.length <= 0)
            return console.log(
                chalk.yellowBright.bold(`[Button-Handler] No loadable Buttons detected`)
            );
        console.log(
            chalk.blueBright.bold(
                `[Button-Handler]: Loaded ${jsFiles.length} Buttons`
            )
        );

        jsFiles.forEach((fileName, index) => {
            let props = require(fileName);
            client.Buttons.set(props.custom_id, props);
        });
    }
    run()
}