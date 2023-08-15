import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";

export const ExtractMessageFunction = DefineFunction({
  callback_id: "extract_message_function",
  source_file: "functions/extract_message.ts",
  title: "Extract Message",
  input_parameters: {
    properties: {
      message_ts: {
        type: Schema.types.string,
        title: "Timestamp of message"
      },
      channel_id: {
        type: Schema.types.string,
        title: "ID of channel"
      }
    },
    required: ["message_ts", "channel_id"],
  },
  output_parameters: {
    properties: {
      message_text: {
        type: Schema.types.string,
      }
    },
    required: ["message_text"],
  }
});

export default SlackFunction(
  ExtractMessageFunction,
  async ({ inputs, client }) => {
    const message_ts = inputs.message_ts;
    const channel_id = inputs.channel_id;
    const response = await client.conversations.history({
      channel: channel_id,
      latest: message_ts,
      limit: 1,
      inclusive: true
    });
    return {
      outputs: {
        message_text: response["messages"][0]["text"]
      }
    };
  }
);
