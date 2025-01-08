import { ArgumentsHost, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
export declare class InheritanceHttpExceptionFilter extends BaseExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
