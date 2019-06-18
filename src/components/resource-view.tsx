import React from 'react';

import { Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import { Query } from 'react-apollo';

import GraphqlWrapper from 'components/graphql-wrapper';
import { IGraphqlDataWrapper } from 'types/interfaces';
import GqlResource from '../util/gql-resource';

const GraphQL: React.ComponentClass<any> = Query;
interface IDataProps {
    [key: string]: any;
}

interface IResourceRouteProps {
    id?: string;
    title?: string;
    Resource: GqlResource;
    EditPanel: any;
}

const ResourceView = ({ id, Resource, EditPanel }: IResourceRouteProps) => {
    return (
        <GraphQL query={Resource.get} variables={{ id }}>
            { GraphqlWrapper(({ data }: IGraphqlDataWrapper<IDataProps>) => {
                const id = data[Resource.get.dataKey].id;
                const createdAt = data[Resource.get.dataKey].createdAt;
                const updatedAt = data[Resource.get.dataKey].updatedAt;
                if (!Resource.get.dataKey) {
                    throw new Error('dataKey missing on query for resource view');
                }
                return (
                    <div>
                        <div className="grid-list__item-header">
                            <div className="grid-list__item-details">
                                <div> Type: {data[Resource.get.dataKey].__typename} </div>
                                <div> ID: {id} </div>
                                { createdAt && <div> Created: {createdAt} </div> }
                                { updatedAt && <div> Last updated: {updatedAt} </div> }
                            </div>
                            <div className="grid-list__item-actions">
                                <Icon icon={IconNames.EDIT} intent={Intent.PRIMARY} />
                            </div>
                        </div>
                        <EditPanel resource={data[Resource.get.dataKey]} />
                    </div>
                );
            })}
        </GraphQL>
    );
};

export default ResourceView;
