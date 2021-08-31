# node-extra

Provides many node related methods. For example: cp, etc

## usage method

```
npm install node-extra --save-dev
yarn add node-extra --save-dev
```

## Provide use method
--------------------------------
### fs module

1. [isFileExists]: a sync method, juage file exist
2. [isDirExists]: a sync method, juage folder exist
3. [wContent]: a sync method, writes the contents to the specified file
4. [rmFile]: a promise method, remove assign list
5. [cpFile]: a promise method, The folder will be specified Copy to another directory
   for example

#### for example
```
const {fs} = require('node-extra');
fs.cpFile('/src', '/dist')
```

### process module

1. [isFileExists]:  Provides a method to execute the run command, example, npm install node-extra
```
const {process} = require('node-extra');
process.runCommand('npm', ['install']).then(() => {
   // exec success result
}).catch(() => {
   // exec fail result
})
```
