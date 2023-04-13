/* eslint-disable prettier/prettier */
import { Express } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
export const fileFilter = (req:Express.Request,file:Express.Multer.File, cb:Function) => {
  
  if(!file){
    return cb( new Error('File is empty'),false)
  }
  const filesExtension = file.mimetype.split('/')[1];
  const validExtension = ['jpg','png','gif','gif']
  if(validExtension.includes(filesExtension)){
    return cb(null,true)
  }
  cb(null,false)
};
