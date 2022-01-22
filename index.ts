import { config } from 'dotenv';
config();

// import { initialize as initializeDatabase } from './database';
import Canvas from 'discord-canvas';
import { loadMessageCommands, loadSlashCommands } from './commands';

import { Client, Intents, MessageAttachment, TextChannel } from 'discord.js';
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
    ]
});

const slashCommands = loadSlashCommands(client);
const messageCommands = loadMessageCommands(client);

client.on('interactionCreate', (interaction) => {

    if (!interaction.isCommand()) return;

    const run = slashCommands.get(interaction.commandName);

    if (!run) {
        interaction.reply('Unknown command');
        return;
    }

    run(interaction, interaction.commandName);

});

client.on('messageCreate', (message) => {

    if (message.author.bot) return;
    
    const args = message.content.slice(process.env.COMMAND_PREFIX.length).split(/ +/);
    const commandName = args.shift();

    if (!commandName) return;

    const run = messageCommands.get(commandName);
    
    if (!run) return;

    run(message, commandName);

});

client.on('guildMemberAdd', async (member) => {

    const avatar = member.user.displayAvatarURL({ dynamic: false, format: 'png' });
    const welcomer = new Canvas.Welcome();
    welcomer.textMessage = 'Welcome to {server}';
    welcomer.setUsername(member.user.username);
    welcomer.setAvatar(avatar);
    welcomer.setDiscriminator(member.user.discriminator);
    welcomer.setMemberCount(member.guild.memberCount.toString());
    welcomer.setBackground('https://media.discordapp.net/attachments/934122805316943924/934404793097670686/Baniere.png');
    welcomer.setGuildName(member.guild.name);
    const image = await welcomer.toAttachment();
    const attachment = new MessageAttachment(image.toBuffer(), "welcome.png");
    const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL!)! as TextChannel;
    return void channel.send({
        content: `Hey ${member}, welcome to **Kampios**! we hope you will enjoy your stay with us 👋`,
        files: [attachment]
    });

});


client.on('ready', () => {
    console.log(`Logged in as ${client.user!.tag}. Ready to serve ${client.users.cache.size} users in ${client.guilds.cache.size} servers 🚀`);

    /*initializeDatabase().then(() => {
        console.log('Database initialized 📦');
    });*/
});

client.login(process.env.DISCORD_CLIENT_TOKEN);
