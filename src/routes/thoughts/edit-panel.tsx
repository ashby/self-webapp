import React from 'react';
import get from 'lodash/get';
import EditResource from 'components/edit-resource';
import QuerySelect from 'components/query-select';
import SelectInput from 'components/select-input';
import EditableInput from 'components/editable-input';
import Thought from 'queries/thought';

import { IThought } from 'types/interfaces';

interface IEditPanelState {
    isDisabled?: boolean;
    [key: string]: any;
}

interface IEditPanelProps {
    resource: IThought;
}

export default class EditPanel extends React.Component<IEditPanelProps, IEditPanelState> {
    static defaultProps = {
        domains: []
    }
    constructor(props: IEditPanelProps, ...args: any[]) {
        super(props, ...args);

        this.state = {
            thought: props.resource.thought,
            character: props.resource.character,
            quality: props.resource.quality,
            process: props.resource.process,
            source: props.resource.source,
            feeling: props.resource.feeling,
            userId: props.resource.userId,
            path: props.resource.path,
            amendedAt: props.resource.amendedAt,
            sharedAt: props.resource.sharedAt,
            isDisabled: false
        };
    }

    public resetValues = () => {
        const { thought, character, quality, process, source, feeling, userId, path, amendedAt, sharedAt } = this.props.resource;
       
        this.setState( {
            thought, 
            character, 
            quality, 
            process, 
            source, 
            feeling, 
            userId, 
            path, 
            amendedAt, 
            sharedAt
        } );
    }

    public handleSaveComplete = () => {
        this.resetValues();
        this.setState({ isDisabled: false });
    }

    public handleChange = (value: any, key: string) => {
        this.setState({ [key]: value });
    }
    public handleIdentityChange = (value: any, key: string, item: any) => {
        console.log( item );
        this.setState({ identity: value, identityName: item.name, companyId: value });
    }
    public isValid = () => true;

    public handleSave = () => {
        this.setState({ isDisabled: true });
        const { companyId, identityName, experiences } = this.state;
        const data: any = { companyId, identityName, experiences: { set: [ ...experiences ] } };
        const { resource } = this.props;

        if (resource.id !== 'new') {
            data.id = resource.id;
        }

        return data;
    }

    public render() {
        
        const { resource } = this.props;
        const { 
            thoughts
        } = this.state;
        return (
            <EditResource
                Resource={Thought}
                onSave={this.handleSave}
                onSaveComplete={this.handleSaveComplete}
                onReset={this.resetValues}
            >
            { /*
                <QuerySelect 
                    query={Thought.list}
                    attrKey="identity"
                    onChange={this.handleIdentityChange}
                    value={identity}
                    labelKey="name"
                    idKey="companyId">
                    Identity
                </QuerySelect>
                <br />

                <EditableInput 
                    attrKey="companyId"
                    onChange={this.handleChange}
                    disabled={true}
                    defaultButtonText="Select an Identity"
                    isDirty={false}
                    value={companyId}>
                    Company Id
                </EditableInput>
                <br />
                <QuerySelect 
                    query={Thought.list}
                    attrKey="experiences"
                    onChange={this.handleChange}
                    idKey="name"
                    value={experiences}
                    multiSelect>
                    Experiences
                </QuerySelect>

                { domains.length &&
                    <ul className="domain-list">
                        { thoughts.map( d =>
                            <li className="domain" key={d.experienceName}>
                                <dl>
                                    <dt>Experience Name: </dt>
                                    <dd>{d.experienceName}</dd>
                                </dl>
                                <dl>
                                    <dt>Domain: </dt>
                                    <dd>{d.domain}</dd>
                                </dl>
                                <hr />
                            </li> 
                        ) }
                    </ul>
                }
            */}
            </EditResource>
        );
    }
}
