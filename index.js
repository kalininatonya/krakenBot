const config = require('config'); //подключаем пакет config
const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(config.get('telegram.token'), {polling: false});
const text = 'Заполните ТШ!';

bot.sendMessage(config.get('telegram.chatId'), text);

