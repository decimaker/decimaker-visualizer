import React from 'react';
import {BaseComponent} from '../base-component';
import {RouteComponentProps} from 'react-router';

export class StartPage extends BaseComponent<RouteComponentProps<any>>
{
    public render(): React.ReactNode
    {
        return <div className="start-page">
            Sup
        </div>;
    }
}