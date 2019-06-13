import React from 'react';
import { Query } from 'react-apollo';

import SelectInput, { ISelectProps } from './select-input';
import MultiSelectInput from './multi-select-input';
import { IGraphqlWrapper } from 'types/interfaces';
import { CONFIG } from '../config';

interface IQuerySelectProps extends ISelectProps {
    query: any;
    multiSelect: boolean;
    client?: string
    handleCompleted?: any
}

export default class QuerySelect extends React.Component<IQuerySelectProps> {
    public static defaultProps = {
        multiSelect: false,
        ...SelectInput.defaultProps,
    };

    public queryRenderer = ({ loading, error, data }: IGraphqlWrapper<any>): any => {
        if (loading || error || !data) {
            return null;
        }

        const { query, multiSelect, children, value, ...props } = this.props;

        if (!multiSelect) {
            return (
                <SelectInput {...props} value={value} items={data[query.dataKey]} >
                    {children}
                </SelectInput>
            );
        }

        const multiValue: any = value;
        return (
            <MultiSelectInput {...props} value={multiValue} items={data[query.dataKey]} >
                {children}
            </MultiSelectInput>
        );
    }

    public render() {
        return (
            <Query
                onCompleted={this.props.handleCompleted}
                variables={{ userId: localStorage.getItem( CONFIG.USER_ID ) }} 
                query={this.props.query}>
                {this.queryRenderer}
            </Query>
        );
    }
}
