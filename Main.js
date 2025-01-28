import 'fs'
import { readdirSync, renameSync } from 'fs';
import { Command } from 'commander';
import path from 'path';

const cli = new Command();
cli.name('reanamer')
  .version('1.1')
  .option("-o, --old [old...]", "Old Filename")
  .option("-n, --new [new...]", "new Filename")
  .option("-d, --dir <string>", "the directory of where the files are located", process.cwd())
  .parse();

  
const options = cli.opts();
console.log(options.dir);
const file = readdirSync(options.dir);
let newMap = options.old.map((old, index) => [old, options.new[index]]);
let fileCount = 0;

file.forEach(dirData =>{

  const filePath = path.parse(dirData);
  newMap.forEach(old =>{

    if(filePath.name === old[0]){
      if(filePath.dir === "") renameSync(dirData,`${old[1]}${filePath.ext}`);
      else renameSync(dirData, `${filePath.dir}\\${old[1]}${filePath.ext}`);
      fileCount++;
    }
  })

});

console.log(`${fileCount} files renamed.`);
