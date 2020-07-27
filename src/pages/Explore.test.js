import React from 'react';
import Explore from './Explore';
import { shallow, mount } from "enzyme";
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createShallow } from '@material-ui/core/test-utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Explore component', () => {
    let store, shallow, wrapper;
    beforeEach(() => {
      store = mockStore({ user: [], data: [] });
      shallow = createShallow({ dive: true });
      wrapper = shallow(<Explore store={store} />);
    });
    
    it('renders with minimum props', () => {
      console.log(wrapper.props());
      expect(wrapper).toHaveLength(1);
    })
});