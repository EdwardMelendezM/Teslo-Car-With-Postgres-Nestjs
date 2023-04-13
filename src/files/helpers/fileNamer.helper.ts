/* eslint-disable prettier/prettier */
import { Express } from 'express';
import {v4 as uuid} from 'uuid'
// eslint-disable-next-line @typescript-eslint/ban-types
export const fileNamer = (req:Express.Request,file:Express.Multer.File, cb:Function) => {
  
  if(!file){
    return cb( new Error('File is empty'),false)
  }
  
    const filesExtension = file.mimetype.split('/')[1];
    const filename = `${uuid()}.${filesExtension}`

  cb(null,filename)
};
