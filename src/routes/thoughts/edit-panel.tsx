import React from 'react';
import { Query } from 'react-apollo';
import get from 'lodash/get';
import EditResource from 'components/edit-resource';
import QuerySelect from 'components/query-select';
import SelectInput from 'components/select-input';
import EditableInput from 'components/editable-input';
import Thought from 'queries/thought';
import Character from 'queries/character';
import Process from 'queries/process';

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
            processes: [],
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

    public isValid = () => true;

    public handleSave = () => {
        this.setState({ isDisabled: true });
        const { 
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
        } = this.state;
        const data: any = { 
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
         };
        const { resource } = this.props;

        if (resource.id !== 'new') {
            data.id = resource.id;
        }

        return data;
    }
    handleCharacterChange = ( key:any ) => {
        this.setState( { character: key } );
        this.setProcess( key );
    }

    setCharacters = ( data:any ) => this.setState( { characters: data.characters } );

    setProcess = ( data:any ) => {
        const process = data.characters.filter( ( c:any ) => c.key === this.state.character )
        this.setState( { process } );
    }

    public render() {
        
        const { resource } = this.props;
        const { 
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
        } = this.state;
        console.log( character );
        return (
            <EditResource
                Resource={Thought}
                onSave={this.handleSave}
                onSaveComplete={this.handleSaveComplete}
                onReset={this.resetValues}
            >
            <QuerySelect 
                query={Character.list}
                attrKey="character"
                onChange={this.handleCharacterChange}
                value={character}
                labelKey="title"
                idKey="key"
                handleCompleted={this.setCharacters}>
                Character
            </QuerySelect>
            <br />
            {
                process &&
                <Query query={Process.get} variables={{ key: process }}>
                { () => (
                    <EditableInput 
                        attrKey="companyId"
                        onChange={this.handleChange}
                        disabled={true}
                        isDirty={false}
                        value={process}>
                        Process
                    </EditableInput>
                ) }
                    
                </Query>
            }
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
