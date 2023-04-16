import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter, fileNamer } from './helpers/';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly configService: ConfigService,
    private readonly filesService: FilesService,
  ) {}

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticProducImage(imageName);

    res.sendFile(path);
  }

  @Post('product')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 100 },
      storage: diskStorage({
        destination: './static/products',
        filename: fileNamer,
      }),
    }),
  )
  updatedProductImage(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Make sure that file is an image');

    const secureUrl = `${this.configService.get('HOST_API')}/files/product/${
      file.filename
    }`;

    return {
      secureUrl,
    };
  }
}
