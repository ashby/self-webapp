import React from 'react';

import { find } from 'lodash';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select, ItemRenderer } from '@blueprintjs/select';

export interface ISelectProps {
    children?: any;
    disabled?: boolean;
    items: Array<any>;
    onChange: (value: string|string[], attrKey: string, label?: any) => void;
    multiSelect?: boolean
    value: string|string[];
    attrKey: string;
    labelKey: string;
    idKey: string;
    defaultButtonText: string;
}

const TypedSelect = Select.ofType<any>();
const NO_RESULTS = <MenuItem disabled text="No results." />;

export default class SelectInput extends React.Component<ISelectProps> {
    public static defaultProps = {
        items: [],
        labelKey: 'name',
        idKey: 'id',
        defaultButtonText: 'Make a Selection',
    };

    public renderItem: ItemRenderer<any> = (item: any, { handleClick, modifiers }) => (
        <MenuItem
            text=""
            active={modifiers.active}
            key={item[this.props.idKey]}
            label={item[this.props.labelKey]}
            onClick={handleClick}
        />
    )

    public handleItemSelect = (item: any ) => {
        const { idKey, attrKey, onChange } = this.props;
        onChange( item[idKey], attrKey, item );
    }

    public render() {
        const {
            labelKey, // tslint:disable-line:no-unused
            attrKey, // tslint:disable-line:no-unused
            onChange, // tslint:disable-line:no-unused
            children,
            items,
            value,
            idKey,
            defaultButtonText,
            ...props // tslint:disable-line:trailing-comma
        } = this.props;

        const activeItem: any = find(
            items,
            (c: any) => c[idKey] === value,
        ) || null;

        const buttonText = activeItem ? activeItem.name : defaultButtonText ;

        return (
            <TypedSelect
                items={items}
                onItemSelect={this.handleItemSelect}
                itemRenderer={this.renderItem}
                query=""
                noResults={NO_RESULTS}
                activeItem={activeItem}
                popoverProps={{ className: 'bp3-input-group bp3-input-select', minimal: true }}
                {...props}
            >
                <label className="bp3-input-group__label">
                    <span className="bp3-input-group__label-text">{children}</span>
                    <Button className="select-box" text={buttonText} rightIcon="double-caret-vertical">
                        {activeItem && activeItem.title}
                    </Button>
                </label>
            </TypedSelect>
        );
    }
}
