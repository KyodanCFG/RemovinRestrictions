exports.mod = (mod_info) => {
    logger.logInfo(`   [MOD] Loading: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);
    let globalsCache = fileIO.readParsed(db.cacheBase.globals);					        // read from globals
    let settingsFile = require("../settings.json");							            // read from settings.json file
    let gameplaySettings = settingsFile.gameplay;                                       // for tidying up code/abstraction	
    //var consoleLog = "";                                                              // TODO: for external logging

    if (gameplaySettings.removinRestrictions === true) {                                // if 'removinRestrictions' var in settings.json is set to true, execute script
        for (let item in globalsCache.data) {
            let cacheData = globalsCache.data.config;								    // for tidying up code/abstraction	

            cacheData.RestrictionsInRaid = [];                                          // remove all item restrictions
        }

        fileIO.write(db.cacheBase.globals, globalsCache);								// write all changes back to cache (globals.json specifically)
        //fileIO.write(`user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/logs/console.log`, consoleLog);         // TODO: write to log file for ez diagnosin'
        logger.logSuccess(`[MOD] -- ${mod_info.name}: ON`);
    } else {                                                                            // if 'removinRestrictions' var in settings.json is set to false, skip entire script
        logger.logSuccess(`[MOD] -- ${mod_info.name}: OFF`); 
    }
}