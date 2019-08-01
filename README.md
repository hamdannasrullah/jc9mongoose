# BACKEND MONGODB

## LOCALHOST

*Steps:

1. Run MongoDB sesuai folder di C:\Users\User  => mongodb\bin\mongod.exe --dbpath=mongodb-data\

2. Run BackEnd di E:\...\Project\jc9mongoose => nodemon src\index.js

3. Run FrontEnd di E:\...\Project\jc9reactmongoose => npm run start

npm install bootstrap axios redux react-redux redux-thunk react-router-dom reactstrap universal-cookie

#### NOTE:

Jika [nodemon] app crashed, DELETE semua node_modules, lalu instal ulang semua komponennya.

yaitu:

npm install bootstrap axios redux react-redux redux-thunk react-router-dom reactstrap universal-cookie

Lalu Run kembali:

npx nodemon src/index.js


## SERVER SIDE HEROKU

PUSH Semua File ke GitHub

[Create folder .gitignore di VSC ketik di dalamnya --> /node_modules]

## Steps
1. heroku login
2. heroku create jc9expressmysql
3. git add .
4. git commit -m "push heroku"
5. git push origin master
6. git push heroku master
7. klik https://jc9mongoose.herokuapp.com/ untuk test apakah App backend telah berhasil running.

## Upload ulang kode untuk update:
1. git add .
2. git commit -m "push heroku"
3. git push origin master
4. git push heroku master

