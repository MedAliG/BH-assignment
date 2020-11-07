import React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { VoteAnswer } from './VoteAnswer';
import { VoteContext } from '../../context';
import { Radio } from 'antd';

let wrapper: ReactWrapper;

describe("VoteAnswer", () => {
    it('renders vote answer column', () => {
        shallow(
            <VoteAnswer />
        );
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

        wrapper = mount(
            <VoteContext.Provider value={{
                voteState: {
                    question: "some question",
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
                <VoteAnswer />
            </VoteContext.Provider>
        );
    });

    it('renders vote answer column with correct state', () => {
        expect(wrapper.find(VoteAnswer).find(Radio)).toHaveLength(2);
        expect(wrapper.find(VoteAnswer).find('.voteAnswer-question')).toHaveLength(1);
    });

    it('should not render voteanswers when question is empty', () => {
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
                <VoteAnswer />
            </VoteContext.Provider>
        );

        expect(wrapper.find(VoteAnswer).find(Radio)).toHaveLength(0);
        expect(wrapper.find(VoteAnswer).find('.voteAnswer-question')).toHaveLength(0);
    });

    it('should not render voteanswers when there is no answers', () => {
        wrapper = mount(
            <VoteContext.Provider value={{
                voteState: {
                    question: "question exmaple",
                    answers: []
                },
                voteDispatch: (...args) => console.log(...args)
            }} >
                <VoteAnswer />
            </VoteContext.Provider>
        );

        expect(wrapper.find(VoteAnswer).find(Radio)).toHaveLength(0);
        expect(wrapper.find(VoteAnswer).find('.voteAnswer-question')).toHaveLength(0);
    });
});