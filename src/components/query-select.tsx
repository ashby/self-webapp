import React from 'react';
import { Query } from 'react-apollo';

import SelectInput, { ISelectProps } from './select-input';
import MultiSelectInput from './multi-select-input';
import { IGraphqlWrapper } from 'types/interfaces';

interface IQuerySelectProps extends ISelectProps {
    query: any;
    multiSelect: boolean;
    client?: string
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
            <Query variables={{ userId: localStorage.getItem( 'userId' ) }} query={this.props.query}>
                {this.queryRenderer}
            </Query>
        );
    }
}
