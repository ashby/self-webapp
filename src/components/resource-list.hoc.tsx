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
    detail?: string;
    resource: any;
    identityName?: string
}

interface IWrappedQueryProps {
    data: any;
}

interface IListingViewOptions {
    nameKey?: string;
    newLabel?: string;
}

const ItemLink = ({ name, detail, id, resource, identityName }: IItemLinkProps) => {
    let linkId;
    // switch(resource.__typename) {
    //     case 'Experience':
    //         linkId = resource.name;
    //         break;
    //     case 'Identity':
    //         linkId = resource.name;
    //         break;
    //     case 'Solution':
    //         linkId = resource.companyId;
    //         break;
    //     default:
    //         linkId = id;
    //         break;
    // }
    return (
        <Link to={linkId}>
            <Button className="item-link__button">
                {name && <span className="item-link__name">{name}</span>}
                {identityName && <span className="item-link__name">{identityName}</span>}
                {detail && <span className="item-link__detail">{detail}</span>}
            </Button>
        </Link>
    );
}
    


export default function listingView(Resource: GqlResource, options: IListingViewOptions = {}) {
    const { dataKey } = Resource.list;

    const ResourceList = () => (
        <GraphQL query={Resource.list} variables={{ userId: localStorage.getItem( CONFIG.USER_ID ) }}>
            {GraphqlWrapper(({ data }: IWrappedQueryProps) => (
                <ButtonGroup vertical alignText="left">
                    <Link to="./"><Button>{options.newLabel || 'New'}</Button></Link>
                    {data[dataKey] && data[dataKey].map( (resource: any) => (
                        <ItemLink
                            key={resource.id}
                            resource={resource}
                            id={resource.id}
                            name={resource[options.nameKey || 'name']}
                            detail={resource.id}
                        />
                    ))}
                </ButtonGroup>
            ))}
        </GraphQL>
    );

    return ResourceList;
}
