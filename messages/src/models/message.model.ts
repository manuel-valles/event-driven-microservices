import { Schema, model, InferSchemaType } from 'mongoose';
import { customAlphabet, urlAlphabet } from 'nanoid';

const nanoid = customAlphabet(urlAlphabet, 10);

const messageSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  messageId: {
    type: String,
    required: true,
    default: nanoid()
  }
});

export const MessageModel = model('Message', messageSchema);

export type Message = InferSchemaType<typeof messageSchema>;
