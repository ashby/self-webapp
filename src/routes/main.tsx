import { Alignment, Button, Navbar } from '@blueprintjs/core';
import { Link, RouteComponentProps } from '@reach/router';
import React from 'react';
import { IWithChildren } from 'types/interfaces';
import { CONFIG } from '../config';

class Main extends React.Component<IWithChildren>{
    logout = () => {
        localStorage.removeItem( CONFIG.AUTH_TOKEN );
        localStorage.removeItem( CONFIG.USER_ID );
        this.props.navigate && this.props.navigate( '/' );
    }
    signin = () => this.props.navigate && this.props.navigate( '/login' )
    render() {
        const authToken = localStorage.getItem( CONFIG.AUTH_TOKEN );
        return(
            <div>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>Self</Navbar.Heading>
                {
                    authToken && [
                        <Link key="higher-power-route-link" to="higher-power"><Button>Higher Power</Button></Link>,
                        <Link key="characters-route-link" to="characters"><Button>Characters</Button></Link>,
                        <Link key="processes-route-link" to="processes"><Button>Processes</Button></Link>,
                        <Link key="sources-route-link" to="sources"><Button>Sources</Button></Link>,
                        <Link key="paths-route-link" to="paths"><Button>Paths</Button></Link>,
                        <Link key="feelings-route-link" to="feelings"><Button>Feelings</Button></Link>,
                        <Link key="thoughts-route-link" to="thoughts"><Button>Thoughts</Button></Link>
                    ]
                }
            </Navbar.Group>
            <Navbar.Group align={Alignment.RIGHT}>
                { 
                    authToken ?
                    <Button onClick={this.logout}>Log Out</Button> :
                    <Button onClick={this.signin}>Sign in</Button>
                }
            </Navbar.Group>
        </Navbar>
        <main>
            {this.props.children}
        </main>
    </div>
        );
    }
}

export default Main;
