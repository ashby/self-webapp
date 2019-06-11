import { get as _get, find, merge } from 'lodash';

interface IGqlResourceOptions {
    get?: { dataKey: string };
    list?: { dataKey: string };
    mutate?: { dataKey: string };
}
function getPrimaryDataKey(query: any): string {
    const dataKey = _get(query, 'definitions[0].selectionSet.selections[0].name.value') || '';
    if (!dataKey) {
        throw new Error('Unable to retrieve dataKey from gql-tag');
    }
    return dataKey;
}
export default class GqlResource {
    public static getPrimaryDataKey = getPrimaryDataKey;
    public get = { dataKey: '' };
    public list = { dataKey: '' };
    public mutate = { dataKey: '' };

    constructor({ get, list, mutate }: IGqlResourceOptions) {
        if ( list ) {
            this.list = list;
            this.list.dataKey = getPrimaryDataKey(list);
        }
        
        if ( get ) {
            this.get = get;
            this.get.dataKey = getPrimaryDataKey(get);
        }
        
        if ( mutate ) {
            this.mutate = mutate;
            this.mutate.dataKey = getPrimaryDataKey(mutate);
        }
    }

    public writeListCache = (cache: any, primaryResource: any) => {
        return cache.writeQuery( { query: this.list, data: { [this.list.dataKey]: primaryResource }} );
    }

    public readCache = (cache: any) => {
        return cache.readQuery( { query: this.list } );
    }

    public updateCache = (cache: any, { data }: any) => {
        const cacheData = (this.readCache( cache ) || {})[this.list.dataKey] || [];
        const mutateKey = this.mutate.dataKey;
        const existing = find( cacheData, (item) => item.id === data[mutateKey].id );
        if (existing) {
            merge(existing, data[mutateKey]);
            this.writeListCache(cache, [...cacheData]);
        } else {
            this.writeListCache(cache, [...cacheData, data[mutateKey]]);
        }
    }
}
