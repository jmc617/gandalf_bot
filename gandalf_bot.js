require('dotenv').config()

const Discord = require("discord.js")
const client = new Discord.Client()
const fetch = require("node-fetch")
// const keepAlive = require("./server")
const mySecret = process.env.MY_SECRET
const lotrKey = process.env.LOTR_KEY
const prefix = "$wise "
const contactFormURL = "https://forms.gle/MGmftrgU7iC6SYgQ6"
const commandsList = 'The current commands are: \ngandalf, meme, ban @(target person), contact, commands, lol. Start each command with $wise and a space'
const commandsURL = "https://tinyurl.com/GBOTcommands"
//array so that more banishing memes can be added later
const banGifArr = ['https://media.giphy.com/media/njYrp176NQsHS/giphy.gif']

function getGandalfQuote() {
  return fetch('https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfea0/quote', {
    headers: {
      Authorization: `Bearer ${lotrKey}`
    }
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data.docs[Math.floor(Math.random() * data.docs.length)].dialog
  })
  .catch(err => {
    console.log(err);   
  });
}

function getRandomMeme() {
  return fetch('https://www.reddit.com/r/lotrmemes/random.json')
  .then(res => {
    return res.json()
  })
  .then(data => {
    return data[0].data.children[0].data.url 
  })
  .catch(err => {
    console.log(err);   
  });
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return

  if(msg.content === `${prefix}gandalf`){
    getGandalfQuote().then(quote => msg.reply(quote))
  }

  if(msg.content === `${prefix}meme`){
    getRandomMeme().then(meme => msg.reply(meme))
  }

  if(msg.content === `${prefix}contact`){
    getRandomMeme().then(meme => msg.reply(`Contact my creator using this form! \n${contactFormURL}`))
  }

  if(msg.content === `${prefix}commands`){
    getRandomMeme().then(meme => msg.reply(commandsList + `\nFor more information on what each command does click here: ${commandsURL}`))
  }

  if(msg.content === `${prefix}lol`){
    msg.reply('https://gph.is/g/ap0Yj8o')
  }
  
  if(msg.content.startsWith(`${prefix}ban`)){
    
    const banGif = banGifArr[Math.floor(Math.random() * banGifArr.length)]

    const embed = new Discord.MessageEmbed()
      .setColor('00FF00')
      .setImage(banGif);

    msg.channel.send(msg.mentions.members.first(), embed)
  }

})

// keepAlive()
client.login(mySecret)
//TODO:
//quote from characters (Frodo, Gollum, Sam)

//learned:
//headers
//embed objects
//prefix refactor 
//tagging/testing...was tagging myself which was the author not the intended, noticed when I tested tagging the other bot
