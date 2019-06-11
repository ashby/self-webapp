/* tslint:disable:jsx-no-lambda */ // react-apollo gives me no choice
import { FormGroup, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import React from 'react';
import { Mutation, MutationFn } from 'react-apollo';
import GqlResource from '../util/gql-resource';

type EditValues = object;

interface IEditResourceProps {
    onSave: () => EditValues;
    onReset: () => void;
    onSaveComplete: () => void;
    Resource: GqlResource;
    validate?: () => boolean;
    label?: string;
    children?: any;
    disabled?: boolean;
}

export default class EditResource extends React.Component<IEditResourceProps> {
    public static defaultProps = {
        label: '',
        validate: () => true,
        disabled: false,
    };

    public isValid = () => true;

    public handleSave = async (mutate: MutationFn) => {
        if ( !this.isValid() ) {
            return false;
        }

        const data: EditValues = this.props.onSave();
        if (!data) {
            throw new Error('No data passed into `onSave` prop for `EditResource` component');
        }

        await mutate( { variables: { data }} )
            .catch((err) => console.log(err));

        this.props.onSaveComplete();
    }

    public render() {
        const { children, label, onReset, Resource } = this.props;
        return (
            <Mutation
                mutation={Resource.mutate}
                update={Resource.updateCache}
            >
                {(mutate: MutationFn) => (
                    <div className="b3-collapse-body grid-list__item-edit">
                        <FormGroup label={label}>
                            {children}
                        </FormGroup>
                        <div className="grid-list__item-edit-actions">
                            <Icon
                                onClick={() => this.handleSave( mutate )}
                                icon={IconNames.SAVED}
                                intent={Intent.PRIMARY}
                            />
                            <Icon onClick={onReset} icon={IconNames.UNDO} intent={Intent.WARNING} />
                        </div>
                    </div >
                )}
            </Mutation>
        );
    }
}
