import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { time } from "console";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        if(exception?.name === 'CastError' && exception?.kind === 'ObjectId') {
            const status = HttpStatus.BAD_REQUEST;
            const msg = `El id ${exception?.value} no es valido.`;

            this.logger.warn(`Status: ${status} Error: ${JSON.stringify(msg)}`);
            return response.status(status).json({
                time: new Date().toISOString(),
                path: request.url,
                error: msg
            })
        }

        const status = exception instanceof HttpException
            ? exception.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        
        const msg = exception instanceof HttpException
            ? exception.getResponse()
            : exception;
    
        this.logger.error(`Status: ${status} Error: ${JSON.stringify(msg)}`);
        
        response.status(status).json({
            time: new Date().toISOString(),
            path: request.url,
            error: msg
        });
    }   
}