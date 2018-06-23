import {PureComponent} from 'react';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

export abstract class BaseComponent<TProps = Dictionary<any>, TState = Dictionary<any>> extends PureComponent<TProps, TState>
{
    public state: TState = {} as TState;
    public isMounted!: boolean;
    
    protected subscriptions: Map<string, Subscription> = new Map();

    public constructor(props: TProps, context?: {})
    {
        super(props, context);
        // nix built in deprecated warning throwing property with our own
        Object.defineProperty(this, 'isMounted', { writable: true, value: false });
    }

    protected addObservable<T>(key: string, obs: Observable<T>): void
    {
        const prevSubscription = this.subscriptions.get(key);
        
        if (prevSubscription)
            prevSubscription.unsubscribe();
        
        this.subscriptions.set(key, obs.subscribe(value => {
            this.setState({ [key]: value } as any);
        }));
    }

    public componentWillUnmount(): void
    {
        for (const subsciption of Array.from(this.subscriptions.values()))
        {
            subsciption.unsubscribe();
        }
        
        this.subscriptions.clear();
        this.isMounted = false;
    }
    
    public componentDidMount(): void
    {
        this.isMounted = true;
    }

    // add watchParent() that sets the parent component instance in state when available
}