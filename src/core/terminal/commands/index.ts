import { CommandRegistry } from "../CommandRegistry";
import { HelpCommand } from "./HelpCommand";
import { WhoamiCommand } from "./WhoamiCommand";
import { SkillsCommand } from "./SkillsCommand";
import { ExperienceCommand } from "./ExperienceCommand";
import { ProjectsCommand } from "./ProjectsCommand";
import { CertsCommand } from "./CertsCommand";
import { ContactCommand } from "./ContactCommand";
import { ResumeCommand } from "./ResumeCommand";
import { NeofetchCommand } from "./NeofetchCommand";
import { UptimeCommand } from "./UptimeCommand";
import { SudoCommand } from "./SudoCommand";
import {
  LsCommand,
  CatCommand,
  EchoCommand,
  DateCommand,
  HistoryCommand,
  ClearCommand,
} from "./BuiltinCommands";

/** Thêm lệnh mới ở đây — engine tự động nhận qua registry */
export function createDefaultRegistry(): CommandRegistry {
  return new CommandRegistry().register(
    new HelpCommand(),
    new WhoamiCommand(),
    new SkillsCommand(),
    new ExperienceCommand(),
    new ProjectsCommand(),
    new CertsCommand(),
    new ContactCommand(),
    new ResumeCommand(),
    new NeofetchCommand(),
    new UptimeCommand(),
    new SudoCommand(),
    new LsCommand(),
    new CatCommand(),
    new EchoCommand(),
    new DateCommand(),
    new HistoryCommand(),
    new ClearCommand(),
  );
}