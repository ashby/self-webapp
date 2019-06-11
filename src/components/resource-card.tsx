import React from 'react';
import { Card, Elevation } from '@blueprintjs/core';

interface IResourceCardProps {
    children: any;
}

export default class ResourceCard extends React.Component<IResourceCardProps> {
    public render() {
        return (
            <div className="grid-list__item">
                <Card interactive elevation={Elevation.FOUR}>
                    {this.props.children}
                </Card>
            </div>
        );
    }
}
