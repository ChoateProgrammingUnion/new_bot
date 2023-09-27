const { loadFiles } = require("../Functions/FileLoader");
const ascii = require("ascii-table"); 
const chalk = require("chalk");

async function LoadEvents(client) {
    const table = new ascii(); 
    table.setHeading("Event", "Status"); 
    
    await client.events.clear();

    const files = await loadFiles("Events"); 

    files.forEach((file) => {
        const event = require(file);
        const execute = (...args) => event.execute(...args, client); 
        
        client.events.set(event.name, execute); 

        if (event.rest) {
            if (event.once) client.rest.once(event.name, execute);
            else 
            client.rest.on(event.name, execute);
        } else {
            if (event.once) client.once(event.name, execute);
            else 
            client.on(event.name, execute);
        }; 

        table.addRow(event.name, "💚"); 
    }); 

    console.log(chalk.whiteBright(table.toString()), 
        chalk.blue("\n[Events] ") + 
        chalk.cyanBright(": ") + 
        chalk.whiteBright("Loaded Events.")
    ); 
}

module.exports = { LoadEvents }