import {Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';

@Controller('upload')
export class FileController {
    @Post('image')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './files',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                cb(null, uniqueSuffix + '-' + file.originalname)
            }
        }),
    }))
    uploadImage(@UploadedFile() image) {
        console.log(image);
    }
}
