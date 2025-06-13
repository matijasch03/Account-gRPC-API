const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;
const users = [];
let idCounter = 0;

function createUser(call, callback) {
    call.request.id = idCounter++;
    users.push(call.request);
    callback(null, {id: call.request.id});
}

function getUsers (_, callback) {
  callback(null, {users});
}

const server = new grpc.Server();
server.addService(userProto.UserService.service, { CreateUser: createUser, GetUsers: getUsers });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server started on port 50051');
});
