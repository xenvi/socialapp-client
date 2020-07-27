import React from 'react';
import App from './App';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";


describe('App', () => {
  let appWrapper;
  beforeEach(() => {
    appWrapper = shallow(<App />);
  });

  it("renders without crashing", () => {
    expect(appWrapper);
  });
})