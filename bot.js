let Discord = require('discord.io');
let logger = require('winston');
let auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
let bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        let prefix = "!";
        let args = message.slice(prefix.length).trim().split(/ +/g);
        let cmd = args.shift().toLowerCase();
        // this code was used with no parameters.
        //var args = message.substring(1).split(' ');
        //var cmd = args[0];
        //var user = user.mentionable();
        //args = args.splice(1);
        switch (cmd) {
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            case 'birthday':
                let month = args[0];
                let day = args[1];

                if (month === null || day === null) {
                    bot.sendMessage({
                        to: channelID,
                        message: "<@" + userID + ">" + ' Hey, I think you typed your birthday wrong!'
                    });
                } else {
                    //TODO: Connect to database and store USERID and MONTH and DAY. UserID must be primary key. ( only one birthday per user )
                    bot.sendMessage({
                        to: channelID,
                        message: "<@" + userID + ">" + ' Your birthday is ' + month + ' ' + day + '! It has been saved to the database.'
                    });
                }
                break;
            default:
                bot.sendMessage({
                    to: channelID,
                    message: "<@" + userID + ">" + ' Sorry, the robot cannot compute that! Try again with more oil.'
                });
        }
    }
});