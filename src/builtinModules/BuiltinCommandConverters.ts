import { BuiltInModule } from './BuiltInModule'
import { argumentConverter } from '../command'
import { Client, GuildMember, Message, User } from 'discord.js'
import { CommandClient } from '../structures'

export class BuiltinCommandConverters extends BuiltInModule {
  client: Client

  constructor(private cts: CommandClient) {
    super()
    this.client = cts.client
  }

  @argumentConverter(Message, false)
  message(msg: Message) {
    return msg
  }

  @argumentConverter(String)
  string(msg: Message, arg: string) {
    return arg
  }

  getUserIDByMention(mention: string): `${bigint}` | undefined {
    if (!mention) return
    if (mention.startsWith('<@') && mention.endsWith('>')) {
      mention = mention.slice(2, -1)
      if (mention.startsWith('!')) {
        mention = mention.slice(1)
      }
      return mention as `${bigint}`
    }
  }

  @argumentConverter(User)
  user(msg: Message, value: string): User | null {
    const id = this.getUserIDByMention(value)
    if (!id) return null
    const user = this.client.users.cache.get(id)
    return user || null
  }

  @argumentConverter(GuildMember)
  member(msg: Message, value: string): GuildMember | undefined {
    const id = this.getUserIDByMention(value)
    if (!id) return
    const user = msg.guild?.members.cache.get(id)
    return user || undefined
  }

  @argumentConverter(Number)
  number(msg: Message, value: string) {
    const n = Number(value)
    return isNaN(n) ? undefined : n
  }
}
