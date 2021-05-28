import {AkairoClient, CommandHandler, ListenerHandler, MongooseProvider} from 'discord-akairo'
import {join} from 'path'
import GuildModel from '../../models/GuildSettings'
import UserModel from '../../models/UserSettings'
import mongoose from 'mongoose';




declare module 'discord-akairo' {
    interface AkairoClient {
        commandHandler: CommandHandler,
        listenerHandler: ListenerHandler,
        GuildSettings: MongooseProvider,
        UserSettings: MongooseProvider
    }
}


interface Options {
    token: string,
    ownerID: string,
    mongooseURI: string
}

export default class BotClient extends AkairoClient {
    public config: Options
    


    constructor(
        config: Options,
    ) {
        super({
            ownerID: config.ownerID
        });
        this.config = config;
        this.GuildSettings = new MongooseProvider(GuildModel)
        this.UserSettings = new MongooseProvider(UserModel)
        
    }
    public commandHandler = new CommandHandler(this, {
        prefix: (message => {
            if(message.guild) {
                return this.GuildSettings.get(message.guild.id, 'prefix', '$');
            }
            return '$';
        }),
        directory: join(__dirname, '..', '..', 'commands'),
        blockClient: true,
        blockBots: true,
        allowMention: true,
        automateCategories: true,
        commandUtil: true,
        defaultCooldown: 2500,
        handleEdits: true

    })
    public listenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, '..', '..', 'listeners')
    })

    private async connectDatabase(): Promise<void> {
        try {
            await mongoose.connect(this.config.mongooseURI, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log('[✔] Connected to database')
        } catch(e) {
            console.log(e)
        }
    }

    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler)
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler
        })
        this.listenerHandler.loadAll()
        this.commandHandler.loadAll()
        await this.connectDatabase()
        await this.GuildSettings.init()
    }

    public async start(): Promise<string> {
        await this._init()
        return this.login(this.config.token)

    }
}