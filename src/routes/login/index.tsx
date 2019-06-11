import React from 'react';
import { CONFIG } from '../../config';
import { FormGroup, InputGroup, Button } from '@blueprintjs/core';

interface LoginProps {
    path: string
}

export default class Login extends React.Component<LoginProps> {
    state = {
        login: true, // switch between Login and SignUp
        email: '',
        password: ''
    }

    confirm = async () => {
        // ... you'll implement this 🔜
    }
    
    saveUserData = ( token: any ) => {
        localStorage.setItem( CONFIG.AUTH_TOKEN, token )
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
                        <FormGroup>
                            <input
                                value={name}
                                onChange={e => this.setState({ name: e.target.value })}
                                type="text"
                                placeholder="Your name"
                            />
                        </FormGroup>
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
                    <Button onClick={this.confirm}>
                        {login ? 'Login' : 'Create Account'}
                    </Button>
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

