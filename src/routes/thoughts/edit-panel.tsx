import React from 'react';
import { Query } from 'react-apollo';
import { ApolloConsumer } from 'react-apollo';
import {
    TextArea,
    Intent,
    RadioGroup,
    Radio,
    Switch
} from '@blueprintjs/core';
import { DatePicker } from '@blueprintjs/datetime';
import get from 'lodash/get';
import EditResource from 'components/edit-resource';
import QuerySelect from 'components/query-select';
import SelectInput from 'components/select-input';
import EditableInput from 'components/editable-input';
import Thought from 'queries/thought';
import Character from 'queries/character';
import Process from 'queries/process';
import Source from 'queries/source';
import Emotion from 'queries/emotion';
import Path from 'queries/path';
import { IGraphqlWrapper } from 'types/interfaces';

import { IThought } from 'types/interfaces';
import { CONFIG } from '../../config';

import "./thought.scss";

interface IEditPanelState {
    isDisabled?: boolean;
    [key: string]: any;
}

interface IEditPanelProps {
    resource: IThought;
}

export default class EditPanel extends React.Component<IEditPanelProps, IEditPanelState> {
    static defaultProps = {
        characters: [],
        sources: []
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
            resolves: props.resource.resolves,
            resolvedAt: props.resource.resolvedAt,
            prayedAt: props.resource.prayedAt,
            characters: [],
            sources: [],
            isDisabled: false,
            hasResolution: false
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
        //this.resetValues();
        this.setState({ isDisabled: false });
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
            path, 
            amendedAt, 
            sharedAt,
            resolves,
            resolvedAt,
            prayedAt,
        } = this.state;
        const data: any = { 
            thought, 
            character, 
            quality, 
            process, 
            source, 
            feeling, 
            userId: localStorage.getItem( CONFIG.USER_ID ), 
            path,
            resolves,
            resolvedAt,
            prayedAt,
            amendedAt, 
            sharedAt
         };
        const { resource } = this.props;

        if (resource.id !== 'new') {
            data.id = resource.id;
        }

        return data;
    }
    handleThoughtChange = (event:any) => {
        const thought = event.currentTarget.value;
        this.setState( { thought } );
    }
    handleCharacterChange = ( key:any ) => {
        this.setState( { character: key } );
        this.setProcess( key );
    }
    handleChange = ( key:any, attrKey:any ) => this.setState( { [ attrKey ]: key } )
    handleQualityChange = ( event: any ) => {
        const quality = event.currentTarget.value === '+' ? true : false;
        this.setState( { quality } );
    }
    handleDateChange = ( type:string, newDate:string ) => {
        console.log( type, newDate );
    }

    setCharacters = ( data:any ) => this.setState( { characters: data.characters } )
    setSourceKeys = async ( data:any, client:any ) => {
        const sourcePromises = data.process.sources.map( async ( key:string ) => await client.query( { query: Source.get, variables: { key } } ) );
        const sourcesData = await Promise.all( sourcePromises );
        const sources = sourcesData.map( (source:any) => ( { ...source.data.source } ) );
        this.setState( { sources } );              
    }
       
    setProcess = ( key:string ) => {
        const character = this.state.characters.filter( ( c:any ) => c.key === key) 
        this.setState( { process: character[0].process } );
    }

    resolve = ( event:any ) => this.setState( { hasResolution: !this.state.hasResolution } );

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
            sources,
            sharedAt,
            resolves,
            resolveAt,
            prayedAt,
            hasResolution
        } = this.state;
        return (
            <EditResource
                Resource={Thought}
                onSave={this.handleSave}
                onSaveComplete={this.handleSaveComplete}
                onReset={this.resetValues}
            >
            <div>
                <label>Thought</label>
                <TextArea
                    fill
                    small={true}
                    intent={Intent.PRIMARY}
                    onChange={this.handleThoughtChange}
                    value={thought}
                />
                <br />
                <br />
                <QuerySelect
                    items={[]}
                    query={Emotion.list}
                    attrKey="feeling"
                    onChange={this.handleChange}
                    value={feeling}
                    labelKey="title"
                    idKey="key"
                    defaultButtonText="Choose an emotion">
                    Feeling
                </QuerySelect>
                <br />
                <RadioGroup
                    inline
                    label="Quality"
                    onChange={this.handleQualityChange}
                    selectedValue={quality ? '+' : '-' } >
                    <Radio label="+" value="+" />
                    <Radio label="-" value="-" />
                </RadioGroup>
            </div>
            <hr />
            <div>
                <div className="thought-col">
                    <QuerySelect
                        items={[]}
                        query={Character.list}
                        attrKey="character"
                        onChange={this.handleCharacterChange}
                        value={character}
                        labelKey="title"
                        idKey="key"
                        defaultButtonText="Choose a character"
                        handleCompleted={this.setCharacters}>
                        Character
                    </QuerySelect>
                    <br />
                    {
                        process && [
                            <ApolloConsumer key="process-source-consumer"> 
                                {
                                    client => (
                                        <Query
                                            key="process-input" 
                                            query={Process.get} 
                                            variables={{key: process}}
                                            onCompleted={( data:any ) => this.setSourceKeys( data, client )}>
                                            { ( { data }:IGraphqlWrapper<any> ) => (
                                                <EditableInput 
                                                    attrKey="companyId"
                                                    onChange={this.handleChange}
                                                    disabled={true}
                                                    isDirty={false}
                                                    value={get( data, 'process.title', '' )}>
                                                    Process
                                                </EditableInput>
                                            ) }
                                        </Query>
                                    )
                                }
                            </ApolloConsumer>,
                            <br key="process-source-break" />,
                            <SelectInput
                                key="source-select"
                                attrKey="source"
                                onChange={this.handleChange}
                                value={source}
                                items={sources}
                                defaultButtonText="Choose a source"
                                labelKey="title"
                                idKey="key">
                                Source
                            </SelectInput>
                        ]
                    }
                </div>
                <div className="thought-col">
                    <QuerySelect
                        items={[]}
                        query={Path.list}
                        attrKey="path"
                        onChange={this.handleChange}
                        value={path}
                        labelKey="title"
                        idKey="key"
                        defaultButtonText="Choose a path">
                        Path
                    </QuerySelect>
                </div>
            </div>
            <div className="thought-row"><hr /></div>
            <div className="thought-row">
                <Switch checked={hasResolution} label="Has a resolution" onChange={this.resolve} />
            </div>
            {
                hasResolution &&
                <div>
                    <div className="thought-row">
                        <div className="thought-col">
                            <AtDateCheck 
                                label="Resolved" 
                                type="resolvedAt"
                                open={true}
                                handleDateChange={this.handleDateChange}
                                selectedDate={resolveAt} />
                        </div>
                        <div className="thought-col">
                            <AtDateCheck 
                                label="Shared" 
                                type="sharedAt" 
                                handleDateChange={this.handleDateChange}
                                selectedDate={sharedAt} />
                        </div>
                    </div>
                    <div className="thought-row">
                        <div className="thought-col">
                            <AtDateCheck 
                                label="Prayed" 
                                type="prayedAt" 
                                handleDateChange={this.handleDateChange}
                                selectedDate={prayedAt} />
                        </div>
                        <div className="thought-col">
                            <AtDateCheck 
                                label="Amended" 
                                type="amendedAt" 
                                handleDateChange={this.handleDateChange}
                                selectedDate={amendedAt} />
                        </div>
                    </div>
                    <div className="thought-row">
                        <QuerySelect
                            items={[]}
                            query={Thought.list}
                            multiSelect={true}
                            attrKey="resolves"
                            onChange={this.handleCharacterChange}
                            value={resolves}
                            labelKey="thought"
                            idKey="key"
                            defaultButtonText="Choose a thought"
                            handleCompleted={this.setCharacters}>
                            Resolves thought:
                        </QuerySelect>
                    </div>
                </div>
            }
            
            
            </EditResource>
        );
    }
}

interface AtDateCheckProps{
    label: string
    selectedDate: Date
    handleDateChange: Function
    type: string
    open?: boolean
}

class AtDateCheck extends React.Component<AtDateCheckProps> {
    static defaultProps = {
        open: false
    }
    state = {
        checked: false,
        now: new Date()
    }
    constructor( props:any ) {
        super( props );
        this.state.checked = props.open;
        if ( props.open ) {
            props.handleDateChange( props.type, this.state.now );
        }
    }
    switch = () => {
        this.setState( { checked: !this.state.checked } );
        if ( !this.state.checked ) {
            this.props.handleDateChange( this.props.type, '' );
        }
    }
    render () {
        const {
            label,
            selectedDate,
            type
        } = this.props;
        const {
            checked,
            now
        } = this.state;
        return (
            <div>
                <Switch checked={checked} label={label} onChange={this.switch} />
                {
                    checked &&
                    <DatePicker
                        onChange={( newDate:any ) => this.props.handleDateChange( type, newDate )}
                        value={selectedDate || now}
                    />
                }
            </div>
        );
    }
}
