import React from 'react';
import Routes from './Routes';
import { MemoryRouter
} from 'react-router';
import { mount, shallow } from "enzyme";
// components
import Cover from "./pages/Cover";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import News from "./pages/News";
import User from "./pages/User";
import Followers from "./pages/Followers";
import Following from "./pages/Following";
// redux
import { Provider } from "react-redux";
import store from './redux/store';

describe('Routes render correct component', () => {
    const TestRoute = props => (
      <MemoryRouter initialEntries={props.initialEntries}>
        <Provider store={store}>
          <Routes {...props} store={store} />
          </Provider>
      </MemoryRouter>
    );
  
    it('routes / to Cover page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/']} />);
       expect(wrapper.find(Cover)).toHaveLength(1);
    });
    it('routes /home to Home page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/home']} />);
      expect(wrapper.find(Home)).toHaveLength(1);
      });
    it('routes /explore to Explore page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/explore']} />);
      expect(wrapper.find(Explore)).toHaveLength(1);
      });
    it('routes /news to News page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/news']} />);
      expect(wrapper.find(News)).toHaveLength(1);
      });
    it('routes /users/:handle to User page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/users/:handle']} />);
      expect(wrapper.find(User)).toHaveLength(1);
      });
    it('routes /users/:handle/post/:postId to User page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/users/:handle/post/:postId']} />);
      expect(wrapper.find(User)).toHaveLength(1);
      });
    it('routes /users/:handle/followers to Followers page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/users/:handle/followers']} />);
      expect(wrapper.find(Followers)).toHaveLength(1);
      });
    it('routes /users/:handle/following to Following page', () => {
      const wrapper = mount( <TestRoute initialEntries={['/users/:handle/following']} />);
      expect(wrapper.find(Following)).toHaveLength(1);
      });
  })