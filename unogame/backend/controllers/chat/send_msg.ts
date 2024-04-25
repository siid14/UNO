import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

const sendMessage = (req, res) => {
  let { id: roomId } = req.params; //   params - someurl/:id  (placeholder)
  const { message } = req.body;
  const { username } = req.session.user;

  const io = req.app.get("io");

  // 0 for lobby
  roomId = roomId === undefined ? 0 : roomId;

  console.log({ username, message, roomId });

  // Create bottts style avatar based on username
  const avatar = createAvatar(bottts, {
    seed: `${username}`,
    size: 32
  });

  const svg = avatar.toString();
  // console.log("test avatar:" + svg);

  io.emit(`chat:message:${roomId}`, {
    avatar: svg, 
    from: username,
    timestamp: Date.now(),
    message,
  });

  res.sendStatus(200);
};

export { sendMessage }