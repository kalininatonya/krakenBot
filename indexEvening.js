const TelegramBot = require('node-telegram-bot-api');
const config = require('config');
const fs = require('fs');

const bot = new TelegramBot(config.get('telegram.token'), {polling: false});
const {
    link
} = config.get('work');

const {
    eveningText
} = config.get('eveningMessage');

const message = `${eveningText}\n${link}`;

const fileName = 'indexImg.txt';
const picturesPath = './pictures';
let indexPicture;
const pictures = fs.readdirSync(picturesPath).map(a => a.split('.'));
const isExist = fs.existsSync(fileName);

if (isExist) {
    indexPicture = fs.readFileSync(fileName,'utf8');

    if(Number(indexPicture) >= pictures.length - 1) {
        indexPicture = 0;
    } else {
        indexPicture = Number(indexPicture) + 1;
    }
} else {
    //Для первой записи
    indexPicture = 0;
}

const imgWithSort = pictures.sort(([name1], [name2]) => [Number(name1)] - [Number(name2)]);
const [name, extension] = imgWithSort[indexPicture];
const imgPath = `${picturesPath}/${name}.${extension}`;


bot.sendPhoto(config.get('telegram.chatId'), `${imgPath}`, options = {caption : message});
