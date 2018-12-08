import io from 'socket.io-client';

const server_url = 'http://localhost'
let socket = null;
const connectToServer = () => {
  if (socket) return;
  if (!socket) {
    socket = io(server_url);
  }
  socket.on('news', (data) => {
    console.log(`hello: ${data.hello}`);
  });
};

const listenToData = (cb) => {
  if (!socket) {
    connectToServer();
  }
  socket.on('data', (data) => {
    cb(data);
  });
}

const disconnect = () => {
  if (socket) {
    socket.disconnect();
  }
}

export { socket, connectToServer, listenToData, disconnect };
