import React from 'react';

import ResourceCard from 'components/resource-card';
import createListingView from 'components/resource-list.hoc';
import createResourceRoute from 'components/resource-route.hoc';
import ResourceView from 'components/resource-view';

import Thought from 'queries/thought';

import EditPanel from './edit-panel';

import { IThought } from 'types/interfaces';

const DEFAULT_THOUGHT: IThought = {
    __typename: 'Thought',
    thought: '',
    title: '',
    id: 'new',
    character: '',
    quality: true,
    process: '',
    source: '',
    feeling: '',
    userId: `${localStorage.getItem('user-id')}`,
    path: '',
    amendedAt: undefined,
    sharedAt: undefined,
    resolves: undefined,
    resolvedAt: undefined,
    prayedAt: undefined
};

const NewResource = (props: any) => (
    <ResourceCard>
        <EditPanel resource={DEFAULT_THOUGHT} />
    </ResourceCard>
);

const Resource = ({ id }: any ) => (
    <ResourceCard>
        <ResourceView id={id} Resource={Thought} EditPanel={EditPanel} />
    </ResourceCard>
);

const ListingView = createListingView(Thought);

export default createResourceRoute(ListingView, NewResource, Resource);
