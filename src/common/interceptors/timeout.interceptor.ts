import { CallHandler, ExecutionContext, Injectable, NestInterceptor, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, timeout, TimeoutError } from "rxjs";

@Injectable()
export class TimeOutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(timeout(10000),
        catchError((err) => {
            if (err instanceof TimeoutError) {
            throw new RequestTimeoutException('La petición excedió el tiempo máximo de espera.');
            }
            throw err;
        }));
    }
}