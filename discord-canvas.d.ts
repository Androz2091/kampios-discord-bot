declare module 'discord-canvas' {

    class ToBufferC {
        toBuffer(): Buffer;
    }

    export class Welcome {
        constructor();

        public textMessage: string;

        setUsername(username: string): Welcome;
        setDiscriminator(discr: string): Welcome;
        setMemberCount(count: string): Welcome;
        setGuildName(name: string): Welcome;
        setAvatar(url: string): Welcome;
        setColor(id: "title" | "title-border" | "avatar" | "username" | "username-box" | "hashtag" | "discriminator" | "discriminator-box" | "message" | "message-box" | "member-count" | "background" | "border", color: string): Welcome;
        setBackground(bg: string): Welcome;
        toAttachment(): ToBufferC;
    }

}
