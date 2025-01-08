import { DiaryRepository } from './diary.repository';
import { GetAllDiaryResDto } from './dto/getAllDiary.dto';
import { GetDiaryResDto } from './dto/getDiary.dto';
import { CreateDiaryReqDto } from './dto/createDiary.dto';
import { UpdateDiaryReqDto, UpdateDiaryResDto } from './dto/updateDiary.dto';
export declare class DiaryService {
    private diaryRepository;
    constructor(diaryRepository: DiaryRepository);
    private logger;
    getDiaryByUser(userId: string, index: number): Promise<GetAllDiaryResDto[]>;
    getDiaryById(diaryId: number, userId?: string): Promise<GetDiaryResDto>;
    createDiary(userId: string, createDiaryReqDto: CreateDiaryReqDto): Promise<void>;
    updateDiary(diaryId: number, updateDiaryReqDto: UpdateDiaryReqDto): Promise<UpdateDiaryResDto>;
    deleteDiary(diaryId: number): Promise<void>;
    restoreDiary(diaryId: number): Promise<UpdateDiaryResDto>;
}
