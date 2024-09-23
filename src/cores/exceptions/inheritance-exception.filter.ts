import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

// 기존 ExceptionFilter의 catch를 오버라이드하여 각각의 (Http, Ws, ...)Exception을 처리할 수 있음.
// 이미 기본적인 메서드가 정의되어 있는 추상 클래스이므로 BaseExceptionFilter 내장 메서드 역시 사용 가능
@Catch(HttpException)
export class InheritanceHttpExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    super.catch(exception, host); // 기본 예외 처리 로직 호출

    /* BaseExceptionFilter를 확장하여 상속 ExceptionFilter를 선언했을 경우, 
    method or controller-scoped 필터로 사용할 때
    new를 통한 인스턴스를 사용하지 말고 Nest 자체에서 instantiate하게 해야한다. */
  }
}
