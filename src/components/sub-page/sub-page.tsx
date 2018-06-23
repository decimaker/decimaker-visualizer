import React from 'react';
import {BaseComponent} from '../base-component';
import {RouteComponentProps} from 'react-router';
import {ExampleService} from '../../services/example-service';
import {lazyInject} from '../../services/container';

interface SubPageProps
{
    color: string;
}

interface SubPageState
{
    time: string;
}

export class SubPage extends BaseComponent<RouteComponentProps<SubPageProps>, SubPageState>
{
    @lazyInject(ExampleService)
    private exampleService: ExampleService;

    public componentWillMount(): void
    {
        this.addObservable('time', this.exampleService.getTime());
    }

    public render(): React.ReactNode
    {
        return <div className="sub-page" style={{backgroundColor: this.props.match.params.color}}>
            {this.state.time}
        </div>;
    }
}