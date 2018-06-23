import {injectable} from 'inversify';
import {HttpError} from '../errors/httpError';
import {NO_CONTENT} from 'http-status-codes';

declare const SERVER_BASE_URL: string;

@injectable()
export class Server
{
    public async getAll<T>(type: Constructable<T>, path: string): Promise<T[]>
    {
        const result = await this.makeRequest('GET', path);
        
        if (!Array.isArray(result))
            throw new Error(`Error in getAll ${path}: result is not an array`);
        
        return result.map(item => new type(item));
    }
    
    public async get<T>(type: Constructable<T>, path: string): Promise<T>
    public async get<T>(type: null, path: string): Promise<Dictionary<any>>
    public async get<T>(type: Constructable<T>|null, path: string): Promise<T|Dictionary<any>>
    {
        const result = await this.makeRequest('GET', path);
        
        return type ? new type(result) : result;
    }
    
    public post(path: string, body: object): Promise<void>
    {
        return this.makeRequest('POST', path, body) as Promise<any>;
    }

    public patch(path: string, body: object): Promise<object>
    {
        return this.makeRequest('PATCH', path, body) as Promise<any>;
    }
    
    private async makeRequest(method: 'GET'|'POST'|'PUT'|'DELETE'|'PATCH', path: string, body?: object): Promise<object>
    {
        const headers = new Headers({
            'Accept': 'application/json'
        });
        const init: RequestInit = {
            method,
            headers,
            credentials: 'same-origin'
        };
        
        if (body)
        {
            init.body = JSON.stringify(body);
            headers.append('Content-Type', 'application/json');
        }

        const request = new Request(`${SERVER_BASE_URL}${path}`, init);
        const response = await fetch(request);
        
        if (!response.ok)
            throw new HttpError(
                `Unsuccessful request: "${request.method} ${response.url}: ${response.status} ${response.statusText}"`,
                request, response);
        
        if (response.status === NO_CONTENT)
            return {};
        
        const responseBody = await response.json();
        
        if (!responseBody.data)
            throw new HttpError(
                `Unsuccessful request: "${request.method} ${response.url}: Response does not contain data property`,
                request, response);
        
        return responseBody.data;
    }
}