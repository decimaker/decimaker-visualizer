import {BaseComponent} from '../base-component';
import React from 'react';

export class NoMatchPage extends BaseComponent
{
    public render(): React.ReactNode
    {
        return <div className="no-match-page">
            <div className="error-text">
                404
            </div>
        </div>;
    }
}