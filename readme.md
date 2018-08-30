## ElectroEncryptor - Encrypting messaging tool on Electron + Flow

* version 0.1.0
* now works only with latin symbols
* without Babel (using `flow-remove-types` and `cryptico`)


## How to start

* `npm install` - will install all dependencies

* `npm start` - will get all files from `src` folder then remove types and copy all files to lib folder and then run it with `node`

* `npm run dev` - will create watcher for `src` folder and remove types and copy all files to lib folder and then run it with `nodemon`. On each change in files in `src` folder it will restart
