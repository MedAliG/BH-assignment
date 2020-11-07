import React from 'react';
import App from './App';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { VoteResult, VoteAnswer, VoteCreate } from './components';

let wrapper: ReactWrapper;

describe("App", () => {
  it('renders App', () => {
    shallow(<App />);
  });

  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    wrapper = mount(<App />);
  });

  it('renders the 3 vote columns components', () => {
    expect(wrapper.find(VoteCreate)).toHaveLength(1);
    expect(wrapper.find(VoteAnswer)).toHaveLength(1);
    expect(wrapper.find(VoteResult)).toHaveLength(1);
  });
});