import { Manifest } from "deno-slack-sdk/mod.ts";
import Configure from "./workflows/configure.ts";
import QuickReply from "./workflows/quick_reply.ts";
import Discuss from "./workflows/discuss.ts";

export default Manifest({
  name: "chatgpt-on-deno",
  description: "ChatGPT on Slack's modular platform",
  icon: "assets/openai.png",
  workflows: [Configure, QuickReply, Discuss],
  outgoingDomains: ["api.openai.com"],
  botScopes: [
    "commands",
    "app_mentions:read",
    "chat:write",
    "chat:write.public",
    "channels:join",
    "channels:history",
    "triggers:read",
    "triggers:write",
  ],
});
