import {Command, Argument} from "discord-akairo";
import {Message} from 'discord.js'

export default class PingCommand extends Command {
    constructor() {
        super('ping', {
            aliases: ['ping'],
            cooldown: 4000,
        });
    }

    public async exec(message: Message, args:Array<Argument> ): Promise<void> {

        await message.channel.send({
            embed: {
                description: `** ${this.client.ws.ping} ** ms`
            }
        })

    }
}