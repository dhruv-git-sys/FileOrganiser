const fs=require("fs");
const path=require("path");
const {log,error}=require("console");
const dir_path=__dirname;
function orgFile(dirPath){
    fs.readdir(dirPath,(err,files)=>{
        if(err){
            error(`Error:${err}`);
            return;
        }
        files.forEach((file=>{
            const fullPath=path.join(dirPath,file);
            fs.stat(fullPath,(err,stats)=>{
                if(err){
                    error(`Error status: ${err}`);
                    return;
                }
                if(stats.isFile()){
                    const ext=path.extname(file).slice(1);
                    if(!ext) return;
                    const folderPath=path.join(dirPath,ext);
                    if(!fs.existsSync(folderPath)){
                        fs.mkdirSync(folderPath);
                    }
                    const destPath=path.join(folderPath,file);
                    fs.rename(fullPath,destPath,(err)=>{
                        if(err){
                            error(`Error:${err}`);
                        }
                        else{
                            log(`Moved:${file}->${folderPath}`);
                        }
                    });
                }
            });
        }));
    });
}
orgFile(dir_path)