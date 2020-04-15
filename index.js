const Telegraf = require('telegraf');
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');
const menu = require('./inlineMenu/menu');
const exception = require('./inlineMenu/exception');
const products = require('./inlineMenu/products');
const plan = require('./inlineMenu/plan');
const change = require('./inlineMenu/change');
const type = require('./inlineMenu/type');

mongoose.connect('mongodb://localhost:27017/mealPlanner', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(Telegraf.log());
bot.use(menu.init());
bot.use(exception.init());
bot.use(plan.init());
bot.use(products.init());
bot.use(change.init());
bot.use(type.init());

bot.startPolling();

bot.help((ctx) =>
  ctx.replyWithMarkdown(
    '*Available Commands*\n' +
      '*/help* _Show this help message_\n' +
      '*/set_specialdiet* _Set special diet_\n' +
      '*/set_exception* _ingredients that must be excluded_\n' +
      '*/myinfo* _Get daily plan for you_\n' +
      '*/change_myinfo* _Get daily plan for you_\n' +
      '*/get_plan* _Get daily plan for you_\n' +
      '*/set_typeofplan* _Choose new purpose_\n' +
      '*/about* _Show info about the bot_\n'
  )
);

bot.command('myinfo', async (ctx) => {
  try {
    const user = await User.findOne({ telegramId: ctx.chat.id });
    if (user.diet && user.exceptions) {
      ctx.reply(
        `Age: ${user.age}, Sex: ${user.sex}, Height: ${user.height}, Weight: ${
          user.weight
        }, calories: ${user.calories}, diet: ${
          user.diet
        }, excluded products: ${user.exceptions.split('%252C%20')}, purpose: ${user.purpose}`
      );
    }
    if (user.diet && !user.exceptions) {
      ctx.reply(
        `Age: ${user.age}, Sex: ${user.sex}, Height: ${user.height}, Weight: ${user.weight}, calories: ${user.calories}, diet: ${user.diet}, purpose: ${user.purpose}`
      );
    }
    if (user.diet && !user.exceptions) {
      ctx.reply(
        `Age: ${user.age}, Sex: ${user.sex}, Height: ${user.height}, Weight: ${
          user.weight
        }, calories: ${user.calories}, excluded products: ${user.exceptions.split(
          '%252C%20'
        )}, purpose: ${user.purpose}`
      );
    } else if (!user.diet && !user.exceptions) {
      ctx.reply(
        `Age: ${user.age}, Sex: ${user.sex}, Height: ${user.height}, Weight: ${user.weight}, calories: ${user.calories}, purpose: ${user.purpose}`
      );
    }
  } catch (error) {
    console.log(error);
  }
});

bot.launch();
