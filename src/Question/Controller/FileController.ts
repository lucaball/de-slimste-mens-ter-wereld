import {Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer';
import {Image} from "../../Models/Image";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm/index";
import {Video} from "../../Models/Video";

@Controller('')
export class FileController {

    constructor(
        @InjectRepository(Image)
        private imageRepository: Repository<Image>,
        @InjectRepository(Video)
        private videoRepository: Repository<Video>
    ) {
    }

    @Get('files')
    async getImages(@Query('type') type){

        let repo = this.imageRepository;
        if(type === 'video'){
            repo = this.videoRepository;
        }

        return {
            files : await repo.find()
        }
    }


    @Post('/upload/files')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './client/public/media/files/',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const fileName = uniqueSuffix + '-' + file.originalname;
                cb(null, fileName.replace(" ", "-"))
            }
        }),
    }))
    async uploadImage(
        @UploadedFile() file,
        @Query('type') type
    ) {

        let saveFile = new Image();
        let repo = this.imageRepository;

        if(type === 'video'){
            saveFile = new Video();
            repo = this.videoRepository;
        }

        saveFile.name = file.originalname;
        saveFile.path = '/media/files/' + file.filename;

        await repo.save([saveFile]);

        return {
            file: saveFile
        }
    }
}
