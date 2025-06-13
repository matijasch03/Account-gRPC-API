const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.User('localhost:50051', grpc.credentials.createInsecure());

client.CreateUser({ name: 'Petar', email: 'petar@gmail.com'}, (err, response) => {
  if (!err) {
    console.log('Successfully created user with id', response.id);
  } else {
    console.error('Error:', err);
  }
});
