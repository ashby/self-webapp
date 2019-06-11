import React from 'react';

import { find } from 'lodash';
import { Button, MenuItem, Tag } from '@blueprintjs/core';
import { MultiSelect, ItemRenderer } from '@blueprintjs/select';

export interface ISelectProps {
    children?: any;
    items: [any];
    onChange: (value: string[], attrKey: string) => void;
    value: string[];
    attrKey: string;
    labelKey: string;
    idKey: string;
    defaultButtonText: string;
}

const TypedSelect = MultiSelect.ofType<any>();
const NO_RESULTS = <MenuItem disabled text="No results." />;

export default class SelectInput extends React.Component<ISelectProps> {
    public static defaultProps = {
        items: [],
        value: [],
        labelKey: 'name',
        idKey: 'id',
        defaultButtonText: 'Make a Selection',
    };

    public renderItem: ItemRenderer<any> = (item: any, { handleClick, modifiers }) => (
        <MenuItem
            icon={this.isItemSelected(item[this.props.idKey]) ? 'tick' : 'blank'}
            active={modifiers.active}
            key={item[this.props.idKey]}
            label={item[this.props.labelKey]}
            onClick={handleClick}
        />
    )

    public getSelectedItems = () => {
        const { items, idKey } = this.props;
        return items.filter((i) => this.isItemSelected(i[idKey]));
    }

    public isItemSelected = (id: string): boolean => this.props.value.indexOf(id) !== -1;
    public renderTag: any = (item: any) => item[this.props.labelKey];
    public handleTagRemove: any = (item: any) => {
        console.log('remove: ', item);
    }

    public handleItemSelect = (item: any) => {
        const { value, idKey, attrKey, onChange } = this.props;
        const id = item[idKey];

        const newValue = this.isItemSelected(id) ?
            value.filter((i) => i !== id) :
            [...value, id];

        onChange(newValue, attrKey);
    }
    public handleClear = () => this.props.onChange([], this.props.attrKey);

    // tslint:disable-next-line:member-ordering
    public tagRemoveButton = (
        <Button className="bp3-multi-select__tag-remove " icon="cross" minimal onClick={this.handleClear} />
    );

    public render() {
        const {
            labelKey, // tslint:disable-line:no-unused
            attrKey, // tslint:disable-line:no-unused
            onChange, // tslint:disable-line:no-unused
            value, // tslint:disable-line:no-unused
            idKey, // tslint:disable-line:no-unused
            children,
            items,
            ...props // tslint:disable-line:trailing-comma
        } = this.props;

        const selectedItems = this.getSelectedItems();
        return (
            <span className="bp3-input-group bp3-input-multi-select">
                <label>{children}</label>
                <TypedSelect
                    items={items}
                    onItemSelect={this.handleItemSelect}
                    itemRenderer={this.renderItem}
                    tagRenderer={this.renderTag}
                    query=""
                    noResults={NO_RESULTS}
                    selectedItems={selectedItems}
                    popoverProps={{ minimal: true }}
                    tagInputProps={{
                        onRemove: this.handleTagRemove,
                        rightElement: this.tagRemoveButton,
                    }}
                    {...props}
                />
            </span>
        );
    }
}
