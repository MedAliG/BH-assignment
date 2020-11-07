import React from 'react';
import { mount, ReactWrapper, shallow } from 'enzyme';
import { VoteContext } from '../../context';
import { VoteResult } from './VoteResult';
import { VictoryChart } from 'victory';

let wrapper: ReactWrapper;

describe("VoteResult", () => {
    it('renders vote result column', () => {
        shallow(
            <VoteResult />
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
                <VoteResult />
            </VoteContext.Provider>
        );
    });

    it('renders voteResult column with correct state', () => {
        expect(wrapper.find(VoteResult).find(VictoryChart)).toHaveLength(1);
        expect(wrapper.find(VoteResult).find('.voteResult-chart-title')).toHaveLength(1);
        expect(wrapper.find(VoteResult).find('.voteResult-pre-title')).toHaveLength(0);
    });

    it('should not render votes chart when question is empty', () => {
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
                <VoteResult />
            </VoteContext.Provider>
        );

        expect(wrapper.find(VoteResult).find(VictoryChart)).toHaveLength(0);
        expect(wrapper.find(VoteResult).find('.voteResult-chart-title')).toHaveLength(0);
        expect(wrapper.find(VoteResult).find('.voteResult-pre-title')).toHaveLength(1);
    });

    it('should not render votes chart when there is no answers', () => {
        wrapper = mount(
            <VoteContext.Provider value={{
                voteState: {
                    question: "question exmaple",
                    answers: []
                },
                voteDispatch: (...args) => console.log(...args)
            }} >
                <VoteResult />
            </VoteContext.Provider>
        );

        expect(wrapper.find(VoteResult).find(VictoryChart)).toHaveLength(0);
        expect(wrapper.find(VoteResult).find('.voteResult-chart-title')).toHaveLength(0);
        expect(wrapper.find(VoteResult).find('.voteResult-pre-title')).toHaveLength(1);
    });
});