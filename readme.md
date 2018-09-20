### Technical Interview Task

To get the server up and running do the following:
- Run npm i --save in BOTH the server AND client directories.
- In the keys directory add a keys.js file with the following format, filling out the fields.

module.exports = {
    databaseHost: ...,
    databaseUser: ...,
    databasePassword: ...,
    database: ...
}

- Then run 'npm run dev'