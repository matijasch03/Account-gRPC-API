const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;
let users = [];
let idCounter = 0;

function createUser(call, callback) {
    call.request.id = idCounter;
    idCounter++;
    users.push(call.request);
    callback(null, { message: 'Successfully created the user ' + call.request.name + ' with id ' + call.request.id});
    //console.log(users);
}

const server = new grpc.Server();
server.addService(userProto.User.service, { CreateUser: createUser });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  server.start();
  console.log('gRPC server started on port 50051');
});
