import React from 'react';

interface IGraphqlWrapper {
    loading?: boolean;
    error?: any;
    data?: any;
    children?: any;
}

const GraphqlWrapperFactory = (Component: any) => ({
    loading,
    error,
    data,
}: IGraphqlWrapper): any => {
    if ( loading ) {
        return 'loading...';
    } else if ( error ) {
        return <span>Error: {JSON.stringify( error )}</span>;
    }
    
    return <Component key={data.id} data={data} />;
};

export default GraphqlWrapperFactory;
