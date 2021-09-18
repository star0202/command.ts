import { KArgumentConverters, KCommands, KListeners, KModulePath, KSlashArgumentConverters, KSlashCommands } from '../constants'
import type { Command } from '../command'
import { Listener } from '../listener'
import { ArgumentConverter, SlashArgumentConverter } from '../command'
import { SlashCommand } from '../slashCommand'

export abstract class Module {
  get commands(): Command[] {
    return Reflect.getMetadata(KCommands, this) || []
  }

  get listeners(): Listener[] {
    return Reflect.getMetadata(KListeners, this) || []
  }

  get argumentConverters(): ArgumentConverter[] {
    return Reflect.getMetadata(KArgumentConverters, this) || []
  }

  get slashArgumentConverters(): SlashArgumentConverter[] {
    return Reflect.getMetadata(KSlashArgumentConverters, this) || []
  }

  get slashCommands(): SlashCommand[] {
    return Reflect.getMetadata(KSlashCommands, this) || []
  }

  get path(): string | undefined {
    return Reflect.getMetadata(KModulePath, this)
  }

  load() {}
  unload() {}
  beforeReload() {}
  afterReload() {}
}
