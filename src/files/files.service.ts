import { existsSync } from 'fs';
import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class FilesService {
  getStaticProducImage(ImageName: string) {
    const path = join(__dirname, '../../static/products', ImageName);
    console.log(path);

    if (!existsSync(path)) {
      throw new BadRequestException(`No product found with image ${ImageName}`);
    }
    return path;
  }
}
