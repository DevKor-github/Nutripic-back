"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DiaryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiaryController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const user_decorator_1 = require("../utils/decorator/user.decorator");
const diary_service_1 = require("./diary.service");
const aws_service_1 = require("../aws/aws.service");
const getAllDiary_dto_1 = require("./dto/getAllDiary.dto");
const getDiary_dto_1 = require("./dto/getDiary.dto");
const createDiary_dto_1 = require("./dto/createDiary.dto");
const updateDiary_dto_1 = require("./dto/updateDiary.dto");
const swagger_1 = require("@nestjs/swagger");
let DiaryController = DiaryController_1 = class DiaryController {
    constructor(diaryService, awsService) {
        this.diaryService = diaryService;
        this.awsService = awsService;
        this.logger = new common_1.Logger(DiaryController_1.name);
    }
    diaryTest() {
        this.logger.log('Diary API Test');
        return 'Diary API Test';
    }
    getAllDiary(uid, index) {
        this.logger.log(`Get All Diary by user: ${uid}`);
        return this.diaryService.getDiaryByUser(uid, index);
    }
    getDiary(diaryId) {
        this.logger.log(`Get Diary by id: ${diaryId}`);
        return this.diaryService.getDiaryById(diaryId);
    }
    async createDiary(uid, createDiaryReqDto) {
        this.logger.log('Create Diary');
        return this.diaryService.createDiary(uid, createDiaryReqDto);
    }
    updateDiary(diaryId, updateDiaryReqDto) {
        this.logger.log('Update Diary');
        return this.diaryService.updateDiary(diaryId, updateDiaryReqDto);
    }
    getSignedUrl(fileName) {
        this.logger.log('Get Signed URL');
        return this.awsService.getPresignedUrl(fileName);
    }
    async deleteDiary(uid, diaryId) {
        this.logger.log('Delete Diary');
        await this.diaryService.getDiaryById(diaryId, uid);
        return this.diaryService.deleteDiary(diaryId);
    }
    async restoreDiary(uid, diaryId) {
        this.logger.log('Restore Diary');
        await this.diaryService.getDiaryById(diaryId, uid);
        return this.diaryService.restoreDiary(diaryId);
    }
};
exports.DiaryController = DiaryController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "diaryTest", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 유저의 모든 다이어리 조회' }),
    (0, swagger_1.ApiParam)({
        name: 'index',
        required: true,
        description: '현재 월을 기준으로 캘린더를 앞뒤로 넘긴 횟수',
        example: 0,
    }),
    (0, swagger_1.ApiOkResponse)({
        type: getAllDiary_dto_1.GetAllDiaryResDto,
        isArray: true,
    }),
    (0, common_1.Get)('calendar/:index'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [require("./dto/getAllDiary.dto").GetAllDiaryResDto] }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('index', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getAllDiary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '특정 다이어리 조회' }),
    (0, swagger_1.ApiParam)({
        name: 'diaryId',
        required: true,
        description: '특정 다이어리의 ID',
        example: 7,
    }),
    (0, swagger_1.ApiOkResponse)({
        type: getDiary_dto_1.GetDiaryResDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '해당 ID의 다이어리가 존재하지 않습니다.',
        example: {
            statusCode: 404,
            message: '해당 ID의 다이어리가 존재하지 않습니다',
            error: 'Not Found',
        },
    }),
    (0, common_1.Get)('/:diaryId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/getDiary.dto").GetDiaryResDto }),
    __param(0, (0, common_1.Param)('diaryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getDiary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '다이어리 생성' }),
    (0, swagger_1.ApiConsumes)('application/json'),
    (0, swagger_1.ApiBody)({
        description: '다이어리 본문, 등록일자, 이미지 URL',
        type: createDiary_dto_1.CreateDiaryReqDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: '다이어리 생성 성공',
    }),
    (0, swagger_1.ApiBadGatewayResponse)({
        description: '다이어리 생성 실패',
        example: {
            statusCode: 502,
            message: '다이어리 생성에 실패했습니다.',
            error: 'Bad Gateway',
        },
    }),
    (0, common_1.Post)('/add'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, createDiary_dto_1.CreateDiaryReqDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "createDiary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '다이어리 수정' }),
    (0, swagger_1.ApiParam)({
        name: 'diaryId',
        required: true,
        description: '특정 다이어리의 ID',
        example: 7,
    }),
    (0, swagger_1.ApiBody)({
        type: updateDiary_dto_1.UpdateDiaryReqDto,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '다이어리 수정 성공',
        type: updateDiary_dto_1.UpdateDiaryResDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '해당 ID의 다이어리가 존재하지 않습니다.',
        example: {
            statusCode: 404,
            message: '해당 ID의 다이어리가 존재하지 않습니다.',
            error: 'Not Found',
        },
    }),
    (0, swagger_1.ApiBadGatewayResponse)({
        description: '다이어리 수정 실패',
        example: {
            statusCode: 502,
            message: '다이어리 수정에 실패했습니다.',
            error: 'Bad Gateway',
        },
    }),
    (0, common_1.Patch)('/update/:diaryId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/updateDiary.dto").UpdateDiaryResDto }),
    __param(0, (0, common_1.Param)('diaryId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateDiary_dto_1.UpdateDiaryReqDto]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "updateDiary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '이미지 업로드 presigned URL 생성' }),
    (0, swagger_1.ApiParam)({
        name: 'fileName',
        required: true,
        description: '업로드할 이미지 파일명',
        example: 'example_image.jpg',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'URL 생성 성공',
        type: String,
    }),
    (0, swagger_1.ApiBadGatewayResponse)({
        description: 'URL 생성 실패',
        example: {
            statusCode: 502,
            message: 'URL 생성에 실패했습니다.',
            error: 'Bad Gateway',
        },
    }),
    (0, common_1.Get)('/get-signed-url/:fileName'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: String }),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "getSignedUrl", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '다이어리 삭제' }),
    (0, swagger_1.ApiParam)({
        name: 'diaryId',
        required: true,
        description: '특정 다이어리의 ID',
        example: 7,
    }),
    (0, swagger_1.ApiNoContentResponse)({
        description: '다이어리 삭제 성공',
        example: {
            statusCode: 204,
        },
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: '다이어리 접근 권한 없음',
        example: {
            statusCode: 403,
            message: '해당 다이어리에 대한 접근 권한이 없습니다.',
            error: 'Forbidden',
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '해당 ID의 다이어리가 존재하지 않습니다.',
        example: {
            statusCode: 404,
            message: '해당 ID의 다이어리가 존재하지 않습니다.',
            error: 'Not Found',
        },
    }),
    (0, swagger_1.ApiBadGatewayResponse)({
        description: '다이어리 삭제 실패',
        example: {
            statusCode: 502,
            message: '다이어리 삭제에 실패했습니다.',
            error: 'Bad Gateway',
        },
    }),
    (0, common_1.Delete)('/delete/:diaryId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    openapi.ApiResponse({ status: common_1.HttpStatus.NO_CONTENT }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('diaryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "deleteDiary", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: '다이어리 복구' }),
    (0, swagger_1.ApiParam)({
        name: 'diaryId',
        required: true,
        description: '특정 다이어리의 ID',
        example: 7,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: '다이어리 복구 성공',
        type: updateDiary_dto_1.UpdateDiaryResDto,
    }),
    (0, swagger_1.ApiForbiddenResponse)({
        description: '해당 다이어리에 대한 접근 권한이 없습니다.',
        example: {
            statusCode: 403,
            message: '해당 다이어리에 대한 접근 권한이 없습니다.',
            error: 'Forbidden',
        },
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: '해당 ID의 다이어리가 존재하지 않습니다.',
        example: {
            statusCode: 404,
            message: '해당 ID의 다이어리가 존재하지 않습니다.',
            error: 'Not Found',
        },
    }),
    (0, swagger_1.ApiBadGatewayResponse)({
        description: '다이어리 복구 실패',
        example: {
            statusCode: 502,
            message: '다이어리 복구에 실패했습니다.',
            error: 'Bad Gateway',
        },
    }),
    (0, common_1.Patch)('/restore/:diaryId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: require("./dto/updateDiary.dto").UpdateDiaryResDto }),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Param)('diaryId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "restoreDiary", null);
exports.DiaryController = DiaryController = DiaryController_1 = __decorate([
    (0, swagger_1.ApiTags)('Diary'),
    (0, common_1.Controller)('diary'),
    __metadata("design:paramtypes", [diary_service_1.DiaryService,
        aws_service_1.AwsService])
], DiaryController);
//# sourceMappingURL=diary.controller.js.map