const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('user.proto');
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

const client = new userProto.UserService('localhost:50051', grpc.credentials.createInsecure());

const command = process.argv[2]; // create, list or delete
switch (command){
  case 'create':
    createUser();
    break;

  case 'list':
    getUsers();
    break;

  case 'delete':
    deleteUserById();
    break;

  default:
    console.log('Error: Incorrect command. Availible are: create, list and delete.');
}

function deleteUserById() {
  const id = parseInt(process.argv[3]);
  if (Number.isInteger(id)) {
    client.DeleteUser({ id }, (err, response) => {
      if (!err) {
        console.log(response.message);
      } else {
        console.error('Error:', err.message);
      }
    });
  }
  else {
    console.log('Error: Not a number.');
  }
}

function getUsers() {
  let filterText = '';
  if (process.argv.length > 3)
    filterText = process.argv[3];

  client.GetUsers({ filterText }, (err, response) => {
    if (!err) {
      console.log('User list:', response.users);
    } else {
      console.error('Error:', err.message);
    }
  });
}

function createUser() {
  // these three commas reserved for the first two words 'node cliennt.js command' in the command line
  const [, , , name, email] = process.argv;

  client.CreateUser({ name, email }, (err, response) => {
    if (!err) {
      console.log('Successfully created user', response.user.name, 'with ID', response.user.id);
    } else {
      console.error('Error:', err.message);
    }
  });
}

