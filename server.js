const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const users = [];
let idCounter = 0;

function createUser(call, callback) {
  errorMessage = returnErrorMessage(call.request.name, call.request.email);
  if (errorMessage){
    const err = {
      code: grpc.status.INVALID_ARGUMENT,
      message: errorMessage
    };
    return callback(err, {});
  }

  call.request.id = idCounter++;
  users.push(call.request);
  callback(null, {user: call.request});
}

function returnErrorMessage(name, email) {
  if (!name || !email)
    return 'Incorrect format error\nCorrect one: node client.js create name email';

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email))
    return 'Incorrect email format\nCorrect one: email@gmail.com';

  return '';
}

function getUsers (call, callback) {
  const filterText = call.request.filterText;
  if (filterText) {
    let filteredUsers = [];

    // filter all users whose names match the filter text
    users.forEach((user) => {
      if (user.name.includes(filterText))
        filteredUsers.push(user);
      });
    return callback(null, {users: filteredUsers});
  }

  callback(null, {users});
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { CreateUser: createUser, GetUsers: getUsers });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server started on port 50051');
});
