export interface IWithChildren {
    path?: string
    navigate?: Function
    children: any;
}

export interface IClaims {
    readonly company_id: string
    readonly person_id: string
}

export interface INestedResource {
    id: string
}

export interface IResource {
    __typename: string
    id: string
    createdAt?: string
    updatedAt?: string
}

export interface IThought extends IResource{
    thought: string
    id: string
    title: string
    character: string
    quality: boolean
    process: string
    source: string
    feeling: string
    userId: string
    path: string
    amendedAt?: string | undefined
    sharedAt?: string | undefined
    resolves?: string | undefined
    resolvedAt?: string | undefined
    prayedAt?: string | undefined
}

export interface IGraphqlWrapper<T> {
    loading?: boolean;
    error?: any;
    data?: T;
    children?: any;
    refetch: Function
}

export interface IGraphqlDataWrapper<T> {
    data: T;
}


