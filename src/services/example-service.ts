import {Observable} from 'rxjs/Observable';
import {interval} from 'rxjs/observable/interval';
import {map, startWith} from 'rxjs/operators';
import {injectable} from 'inversify';

@injectable()
export class ExampleService
{
    public getTime(): Observable<string>
    {
        return interval(500).pipe(
            startWith(-1),
            map(() => (new Date()).toLocaleTimeString())
        );
    }
}