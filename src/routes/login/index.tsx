import React from 'react';
import { Mutation } from 'react-apollo';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { RouteComponentProps } from '@reach/router';
import get from 'lodash/get';
// config
import { CONFIG } from '../../config';
// queries
import Login from 'queries/login';
import Signup from 'queries/signup';

export default class LoginScreen extends React.Component<RouteComponentProps> {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: '',
        signInError: false
    }

    confirm = async ( data:any ) => {
        const token = get( data.login, 'token', false ) || get( data.signup, 'token', false );
        const userId = get( data.login, 'userId', false ) || get( data.signup, 'userId', false );
        if ( token && userId ) {
            this.handleError( 'signInError', false );
            this.saveUserData( token, userId );
            this.props.navigate && this.props.navigate( '/' );
        }
    }
    
    saveUserData = ( token:string, userId:string ) => {
        localStorage.setItem( CONFIG.AUTH_TOKEN, token )
        localStorage.setItem( CONFIG.USER_ID, userId )
    }

    handleChange = (event:React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({ [name]: value });
    }
    handleError = ( error:string, has:boolean = true ) => this.setState( { [error]: has }  );
    render() {
        const { login, email, password, signInError } = this.state
        return (
            <div>
                <h4 className="mv3">{login ? 'Login' : 'Sign Up'}</h4>
                <div className="flex flex-column">
                    {!login && 
                        <p>Enter email and password.</p>
                    }
                    <FormGroup>
                        <InputGroup
                            value={email}
                            name="email"
                            onChange={this.handleChange}
                            type="text"
                            placeholder="email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <InputGroup
                            value={password}
                            name="password"
                            onChange={this.handleChange}
                            type="password"
                            placeholder="password"
                        />
                    </FormGroup>
                </div>
                <div>
                    <Mutation
                        mutation={login ? Login : Signup}
                        variables={{ email, password }}
                        onError={(error:any)=>this.handleError( 'signInError' )}
                        onCompleted={(data:any) => this.confirm( data )}>
                        {( mutation:any ) => {
                            return (
                                <Button onClick={mutation}>
                                    {login ? 'Login' : 'Create Account'}
                                </Button>
                            );
                        } }
                    </Mutation>
                    <Button
                        className="pointer button"
                        onClick={() => this.setState({ login: !login })}
                    >
                        {login ? 'Need to create an account?' : 'Already have an account?'}
                    </Button>
                </div>
                {
                    signInError &&
                    <div>
                        <br />
                        <p>Incorrect sign in credentials. Please try again.</p>
                    </div>
                }
                
            </div>
        )
    }
}

