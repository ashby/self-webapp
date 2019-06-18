import React from 'react';
import { Query } from 'react-apollo';

import { ButtonGroup, Button } from '@blueprintjs/core';
import { Link } from '@reach/router';

import GraphqlWrapper from 'components/graphql-wrapper';
import GqlResource from '../util/gql-resource';

import { CONFIG } from '../config';

const GraphQL: React.ComponentClass<any> = Query;

interface IItemLinkProps {
    name?: string;
    id: string;
    resource: any;
}

interface IWrappedQueryProps {
    data: any;
}

interface IListingViewOptions {
    nameKey?: string;
    newLabel?: string;
}

const ItemLink = ({ resource }: IItemLinkProps) => {
    let linkId;
    console.log(resource);
    switch(resource.__typename) {
        case 'Thought':
            linkId = resource.id;
            break;
        default:
            linkId = resource.key;
            break;
    }
    return (
        <Link to={linkId}>
            <Button className="item-link__button">
                {resource.title && <span className="item-link__id">{resource.title}</span>}
            </Button>
        </Link>
    );
}
    


export default function listingView(Resource: GqlResource, options: IListingViewOptions = {}) {
    const { dataKey } = Resource.list;
    console.log( dataKey );
    const ResourceList = () => (
        <GraphQL query={Resource.list} fetchPolicy="network-only" variables={{ userId: localStorage.getItem( CONFIG.USER_ID ) }}>
            {GraphqlWrapper(({ data }: IWrappedQueryProps) =>{
                console.log( data );
            return (
                <ButtonGroup vertical alignText="left">
                    <Link to="./"><Button>{options.newLabel || 'New'}</Button></Link>
                    {data[dataKey] && data[dataKey].map( (resource: any) => (
                        <ItemLink
                            key={resource.id}
                            resource={resource}
                            id={resource.id}
                        />
                    ))}
                </ButtonGroup>
            ) } )}
        </GraphQL>
    );

    return ResourceList;
}
