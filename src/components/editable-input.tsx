import { InputGroup, Intent } from '@blueprintjs/core';
import React from 'react';

interface IEditableInputProps {
    attrKey: string;
    value: any;
    isDirty: boolean;
    id?: string;
    isDisabled?: boolean;
    Input?: any;
    children?: any;
    onChange: (value: any, attrKey: string) => void;
    [key: string]: any;
}

export default class EditableInput extends React.Component<IEditableInputProps> {
    public static defaultProps = {
        id: 'editable',
        isDisabled: false,
        isDirty: false,
        Input: InputGroup,
    };

    public handleChange = (ev: React.FormEvent<HTMLInputElement>) => {
        const { attrKey, onChange } = this.props;
        onChange(ev.currentTarget.value, attrKey);
    }

    public render() {
        // tslint:disable-next-line:no-unused
        const { Input, attrKey, value, isDisabled, isDirty, onChange, id, children, ...props } = this.props;
        const htmlLabel = `${id}-${attrKey}`;
        return (
            <label htmlFor={htmlLabel}>
                {children}
                <Input
                    onChange={this.handleChange}
                    id={htmlLabel}
                    value={value}
                    disabled={isDisabled}
                    intent={isDirty ? Intent.WARNING : undefined}
                    {...props}
                />
            </label>
        );
    }
}
