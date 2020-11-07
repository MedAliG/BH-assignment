import React, { useReducer } from 'react';
import type { VOTE_ANSWER } from '../Vote.types';

type InitialStateType = {
    question: string,
    answers: VOTE_ANSWER[],

};

const initialState: InitialStateType = {
    question: "",
    answers: []
};

export type VoteContextProps = {
    voteState: InitialStateType,
    voteDispatch: React.Dispatch<any>
};

export const VoteContext = React.createContext<VoteContextProps>({
    voteState: initialState,
    voteDispatch: () => null
});

export const VoteProvider: React.FC = ({ children }) => {

    const reducer = (state: InitialStateType, action: {
        type: string,
        payload:
        InitialStateType['question']
        | InitialStateType['answers']
    }): InitialStateType => {
        switch (action.type) {
            case 'UPDATE_ANSWERS':
                state = {
                    ...state,
                    answers: action.payload as InitialStateType['answers']
                };
                break;
            case 'UPDATE_QUESTION':
                state = {
                    ...state,
                    question: action.payload as InitialStateType['question']
                };
                break;
        }
        return state;
    };

    let initialState = {
        question: "",
        answers: []
    };

    let [state, dispatch] = useReducer(reducer, initialState);

    return (
        <VoteContext.Provider value={{ voteState: state, voteDispatch: dispatch }}>
            {children}
        </VoteContext.Provider>
    )
}