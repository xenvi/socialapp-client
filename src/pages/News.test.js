import React from 'react';
import News from './News';
import Navbar from '../components/layout/Navbar';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { createShallow } from '@material-ui/core/test-utils';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('News component', () => {
  let shallow, store, wrapper;
  beforeEach(() => {
    store = mockStore({ user: [], data: [] });
    shallow = createShallow({ dive: true });
    wrapper = shallow(<News store={store} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toHaveLength(1);
  });
  it('renders Navbar component', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
  });
});

describe('Fetches news', () => {
    let proxyUrl = 'https://cors-anywhere.herokuapp.com/',
      targetUrl = 'https://api.nytimes.com/svc/topstories/v2/us.json?api-key=i1mVIcp3YIRecvpMX8GnhOsiFQw69tKZ';
  
    let store;
    let shallow;
    beforeEach(() => {
      store = mockStore({ user: [], data: [] });
      shallow = createShallow({ dive: true });
    });
    
  it('fetches data from server when server returns a successful response', done => { // 1
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
    const mockFetchPromise = Promise.resolve({ // 3
      json: () => mockJsonPromise,
    });
    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise); // 4
    
    const wrapper = shallow(<News store={store} />); // 5
                            
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(proxyUrl + targetUrl);

    process.nextTick(() => { // 6
      expect(wrapper.state()).toEqual(mockSuccessResponse);
      global.fetch.mockClear(); // 7
      delete global.fetch;
      done(); // 8
    });
  });
});