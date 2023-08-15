import { Manifest } from "deno-slack-sdk/mod.ts";

import { ExtractMessageFunction } from "./functions/extract_message.ts";

export default Manifest({
  name: "Extract Message",
  description: "A workflow step to extract message text",
  icon: "assets/default_new_app_icon.png",
  functions: [ExtractMessageFunction],
  workflows: [],
  outgoingDomains: [],
  botScopes: ["commands", "chat:write", "chat:write.public", "channels:history"]
});
