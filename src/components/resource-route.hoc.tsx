import React from 'react';
import { Divider } from '@blueprintjs/core';
import { Router, RouteComponentProps } from '@reach/router';

export default function createResourceNavBar(
    ListingView: React.StatelessComponent,
    NewResource: React.StatelessComponent<RouteComponentProps>,
    Resource: React.StatelessComponent<RouteComponentProps>,
) {
    const ResourceNavBar = (props: RouteComponentProps) => (
        <div className="resource-view">
            <ListingView/>
            <Divider />
            <div>
                <Router>
                    <NewResource path="/"/>
                    <Resource path="/:id"/>
                </Router>
            </div>
        </div >
    );

    return ResourceNavBar;
}
