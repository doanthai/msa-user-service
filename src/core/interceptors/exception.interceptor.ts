import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        catchError(() =>
          throwError(
            () =>
              new HttpException(
                'Something went wrong',
                HttpStatus.INTERNAL_SERVER_ERROR,
              ),
          ),
        ),
      );
  }
}
