import { DiaryService } from './diary.service';
import { AwsService } from '../aws/aws.service';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { CreateDiaryReqDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
export declare class DiaryController {
    private readonly diaryService;
    private readonly awsService;
    constructor(diaryService: DiaryService, awsService: AwsService);
    private logger;
    diaryTest(): string;
    getAllDiary(uid: string, index: number): Promise<GetAllDiaryResDto[]>;
    getDiary(diaryId: number): Promise<GetDiaryResDto>;
    createDiary(uid: string, createDiaryReqDto: CreateDiaryReqDto): Promise<void>;
    updateDiary(diaryId: number, updateDiaryReqDto: UpdateDiaryReqDto): Promise<UpdateDiaryResDto>;
    getSignedUrl(fileName: string): Promise<string>;
    deleteDiary(uid: string, diaryId: number): Promise<void>;
    restoreDiary(uid: string, diaryId: number): Promise<UpdateDiaryResDto>;
}
