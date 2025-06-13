const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

// these two commas reserved for the first two words 'node cliennt.js' in the command line
const [, , name, email] = process.argv;

client.CreateUser({name, email}, (err, response) => {
  if (!err) {
    console.log('Successfully created user', response.user.name, 'with ID', response.user.id);
  } else {
    console.error('Error:', err.message);
  }
});

client.GetUsers({}, (err, response) => {
  if (!err) {
    console.log('User list:', response.users);
  } else {
    console.error('Error:', err.message);
  }
});
