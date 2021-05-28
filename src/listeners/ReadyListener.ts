import { Listener } from "discord-akairo";

export default class ReadyListener extends Listener {
    constructor() {
        super('CReady', {
            event: 'ready',
            emitter: 'client'
        });
    }

    public exec(): void {
        this.client.user.setActivity('flying in space', { type: 'COMPETING'})
        console.log(`${this.client.user.tag} ready to fly 🚀`)
    }
}