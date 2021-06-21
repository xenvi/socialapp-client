import React from 'react';
import { shallow, mount } from "enzyme";
import toJson from "enzyme-to-json";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
// actions to be tested
import { getPosts }  from "./dataActions";

const mock = new MockAdapter(axios);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore();

describe('getPosts action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('SET_POSTS to response data after a successful API request', () => {
        mock.onGet('/posts').reply(200, { response: { posts: ['data1', 'data2'] }});
        store.dispatch(getPosts()).then(() => {
            let expectedActions = [
                { type: 'LOADING_DATA' },
                {
                    type: 'SET_POSTS',
                    payload: { response: { posts: ['data1', 'data2'] } }
                }
            ]
            expect(store.getActions()).toEqual(expectedActions);
        }).catch((err) => { console.log(err)});
    });
    it('SET_POSTS to [] after a failed API request', () => {
        mock.onGet('/posts').reply(400, { response: { posts: [] } })
        store.dispatch(getPosts()).then(() => {
            let expectedActions = [
                { type: 'LOADING_DATA' },
                {
                    type: 'SET_POSTS',
                    payload: []
                }
            ]
            expect(store.getActions()).toEqual(expectedActions);
        }).catch((err) => { console.log(err)});
    });
})

describe('getProfilePosts action', () => {
    beforeEach(() => {
        store.clearActions();
    });
    it('SET_POSTS to response data after a successful API request', () => {
        mock.onGet(`/profilePosts`, { params: { handle: "user" } }).reply(200, { response: { posts: ['data1', 'data2'] }});
        store.dispatch(getPosts("user")).then(() => {
            let expectedActions = [
                { type: 'LOADING_DATA' },
                {
                    type: 'SET_POSTS',
                    payload: { response: { posts: ['data1', 'data2'] } }
                }
            ]
            expect(store.getActions()).toEqual(expectedActions);
            console.log(store.getActions())
        }).catch((err) => { console.log(err)});
    })
    it('SET_POSTS to [] after a failed API request', () => {
        mock.onGet(`/profilePosts`, { params: { handle: "user" } }).reply(400, { response: { posts: [] } })
        store.dispatch(getPosts("user")).then(() => {
            let expectedActions = [
                { type: 'LOADING_DATA' },
                {
                    type: 'SET_POSTS',
                    payload: []
                }
            ]
            expect(store.getActions()).toEqual(expectedActions);
        }).catch((err) => { console.log(err)});
    })
})

describe('clearErrors action', () => {
    
})