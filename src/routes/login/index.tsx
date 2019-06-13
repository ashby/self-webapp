import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';
import { RouteComponentProps } from '@reach/router';
// config
import { CONFIG } from '../../config';
// queries
import Login from 'queries/login';
import Signup from 'queries/signup';


// interface LoginProps {
//     path: string
//     navigate: Function
// }

export default class LoginScreen extends React.Component<RouteComponentProps> {
    state = {
        login: true, // switch between Login and SignUp
        email: 'asdfas@asdfas.com',
        password: 'fasfas'
    }

    confirm = async ( data: any ) => {
       this.saveUserData( data.login.token, data.login.userId );
       this.props.navigate && this.props.navigate( '/' );
    }
    
    saveUserData = ( token: string, userId: string ) => {
        localStorage.setItem( CONFIG.AUTH_TOKEN, token )
        localStorage.setItem( CONFIG.USER_ID, userId )
    }

    handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;
        this.setState({ [name]: value });
    }
  
    render() {
        const { login, email, password } = this.state
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
                        onCompleted={(data:any) => this.confirm( data )}>
                    {( mutation:any ) => (
                        <Button onClick={mutation}>
                            {login ? 'Login' : 'Create Account'}
                        </Button>
                    )}
                    </Mutation>
                    <Button
                        className="pointer button"
                        onClick={() => this.setState({ login: !login })}
                    >
                        {login ? 'Need to create an account?' : 'Already have an account?'}
                    </Button>
                </div>
            </div>
        )
    }
}

