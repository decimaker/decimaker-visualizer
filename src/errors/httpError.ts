import {BaseError} from 'make-error-cause';

export class HttpError extends BaseError
{
    public readonly request: Request;
    public readonly response: Response;

    public constructor(message: string, request: Request, response: Response, cause?: Error)
    {
        super(message, cause);
        
        this.request = request;
        this.response = response;
    }
}