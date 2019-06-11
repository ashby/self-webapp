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
    name?: string;
    companyId?: string;
    experienceName?: string;
    Resource: GqlResource;
    EditPanel: any;
}

const ResourceView = ({ id, Resource, EditPanel }: IResourceRouteProps) => {
    return (
        <GraphQL query={Resource.get} variables={{ id }}>
            { GraphqlWrapper(({ data }: IGraphqlDataWrapper<IDataProps>) => {
                const id = data[Resource.get.dataKey].id;
                const name = data[Resource.get.dataKey].name;
                const identity = data[Resource.get.dataKey].identity;
                const companyId = data[Resource.get.dataKey].companyId;
                const experienceName = data[Resource.get.dataKey].experienceName;
                if (!Resource.get.dataKey) {
                    throw new Error('dataKey missing on query for resource view');
                }
                return (
                    <div>
                        <div className="grid-list__item-header">
                            <div className="grid-list__item-details">
                                <div> Type: {data[Resource.get.dataKey].__typename} </div>
                                <div> ID: {id} </div>
                                { name && <div> Name: {name} </div> }
                                { identity && <div> Identity: {identity} </div> }
                                { companyId && <div> Company ID: {companyId} </div> }
                                { experienceName && <div> Experience Name: {experienceName} </div> }
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
