import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { VoteCreate } from './VoteCreate';
import { VoteContext } from '../../context';
import { VoteCreateOption } from './option/VoteCreateOption';

let wrapper: ReactWrapper;

describe("VoteCreate", () => {
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

        wrapper = mount(
            <VoteContext.Provider value={{
                voteState: {
                    question: "",
                    answers: [
                        {
                            value: "answer1",
                            count: 420,
                            id: 666
                        },
                        {
                            value: "answer2",
                            count: 69,
                            id: 8008
                        }
                    ]
                },
                voteDispatch: (...args) => console.log(...args)
            }} >
                <VoteCreate />
            </VoteContext.Provider>
        );
    });

    it('renders vote create column with state', () => {
        expect(wrapper.find(VoteCreate).find(VoteCreateOption).children()).toHaveLength(2);
    });
});