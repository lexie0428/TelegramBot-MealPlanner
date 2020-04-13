const User = require('../models/user');
const TelegrafInlineMenu = require('telegraf-inline-menu');

let hideProducts = false;
const products = new TelegrafInlineMenu(`You don't eat some food?`);
products.setCommand('set_exception');
products.simpleButton('NO!', 'f', {
  doFunc: (ctx) => {
    hideProducts = true;
    ctx.reply('Greit for you!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  hide: () => hideProducts
});
products.question('YES!', 'set_exception', {
  uniqueIdentifier: 'e',
  questionText: 'Write allergens or ingredients that must be excluded',
  setFunc: async (_ctx, key) => {
    hideProducts = true;
    const arr = key.split(',')
    const except = arr.join('%252C%20')
    await User.updateOne({ telegramId: _ctx.chat.id }, { exceptions: except });
    _ctx.reply('Changed!\n' +
      'If you want to get new daily meal plan - choose command /get_plan');
  },
  hide: () => hideProducts
})

module.exports = products;
