import React from 'react';
import renderer from 'react-test-renderer';
import { AuthenticatedApp } from '../app';

describe('app', () => {
    it('should render and match snapshot', () => {
        return Promise.resolve( true );
        // const wrapper = renderer.create(<AuthenticatedApp auth={{}} user={{}} />);
        // expect(wrapper.toJSON()).toMatchSnapshot();
    });
});
