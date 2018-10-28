## ElectroEncryptor - Encrypting messaging tool on Electron + Flow

* version 0.7.0
* now works only with full utf-8 table of symbols
* without Babel (using `flow-remove-types` and `cryptico`)


## How to start

* `npm install` - will install all dependencies

* `npm start` - will get all files from `src` folder then remove types and copy all files to lib folder and then run it with `node`

* `npm run dev` - will create watcher for `src` folder and remove types and copy all files to lib folder and then run it with `nodemon`. On each change in files in `src` folder it will restart


## How to release

You can use electron-packager for building releases \
https://github.com/electron-userland/electron-packager

example: \
`electron-packager %app_dir% %build_dir_name% --asar=true --arch=x64 --platform=linux`

where:
   * `--asar=true` - put sources in archive 
   * `--platform=linux` - destination platform. Can be `linux`, `win32`, `darwin`, `all` 

Also packager will add additional information about build to name  

Additional info is here:
https://github.com/electron-userland/electron-packager/blob/master/docs/api.md
    
    
