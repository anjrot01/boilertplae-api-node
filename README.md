<h3 align="center" style="color: blue">API BoilertPlate with autentication and authorization</h3>

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Remaining](#remaining)
- [Contributing](#contributing)
- [Utils](#utils)
- [License](#license)

## Instalation
This API works with a MongoDb environment for storing data, so first install a local mongoDb runtime or use any db on line.

- Clone this repository. 
```
$ git clone ...
```
- Install app.
```
$ npm i
```
- Rename ./example.env by .env and replace data.
- Run Server.
```
$ npm run dev
```
- Populate your db with roles and a superAdmin user.
```
$ npm run seed:db
```
After this command your API will be ready to make the default CRUD, feel free to begin to make more controllers and endpoints.

## Usage
- API works at port 4000, ./request.http has all endpoints you can use for API tests
- Every endpoint you create may be protected by an user role.
- By default the role created in an register call, will be user. If you want to create and user with a different role you can pass it as an attribute in the body of the request.

### Default Roles
- superAdmin
- admin
- user
- guess

This API Boilertplate was created with a POST CRUD example and only Users logged could create, update and delete posts. 
Get PostByID and GetPosts are free endpoints.

### Remaining
- Tests
- Coverages

## Contributing

If you would like to improve this app, feel free to use [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/fraction/readme-boilerplate/compare/).

## Utils
- [NodeJs v14.15.1](https://nodejs.org/en/)
- [Express v4.17.1](https://expressjs.com/)
- [mongoose v5.11.0](https://mongoosejs.com/)
- [jwt v8.5.1](https://jwt.io/)

And others... 😎

## License
This project is licensed under the ISC license, Copyright (c) Antonio Rodríguez. For more information see LICENSE.md.

#### Antonio Rodríguez
#### Javascript Full Stack Developer

Enjoy it 🚀