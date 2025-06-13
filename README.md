# Account gRPC API

This project is a simple gRPC API for managing user accounts using **Node.js**, **@grpc/grpc-js**, and **Protocol Buffers**. It allows creating new user accounts, retrieving a list of all users and deleting user by ID.

---

## Video Presentation

available on youtube link: [my project](https://youtu.be/348TFKbvEEo)

## Functional Requirements

### Define Protobuf Schema

Created a `.proto` file defining:

#### Message: `User`
- `int32 id` – auto-generated
- `string name` – required
- `string email` – required

#### RPC Methods:
```protobuf
  rpc CreateUser (CreateUserRequest) returns (CreateUserReply);
  rpc GetUsers (GetUsersRequest) returns (GetUsersReply);
  rpc DeleteUser (DeleteUserRequest) returns (DeleteUserReply);
```

### Server and Client applications
- implementation and applying for these 3 main methods

#### Extra functions:
- correct number of input data (name and email)
- correct email format
- delete by existing id
- filter users by their name or a part of the name

---

## How to Run the Project

```git clone https://github.com/matijasch03/Account-gRPC-API.git
cd Account-gRPC-API```

You need to have installed Node.js

npm or yarn installed: ```npm install```

If you haven't generated the gRPC stub files:
```
npx grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:./generated \
  --grpc_out=grpc_js:./generated \
  -I ./protos ./protos/user.proto
```

Start the gRPC server: ```node server.js```
In the other terminal start the gRPC client: ```node client.js pera pera@gmail.com```
```node client.js list```
```node client.js marko marko@gmail.com```
```node client.js list```
```node client.js list per```
```node client.js delete 0```
```node client.js list```
