import React, { useContext } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { VoteContext } from '../../../context';
import type { VOTE_ANSWER } from '../../../Vote.types';
import './VoteCreateOption.css';

type Props = {
    answer: VOTE_ANSWER
};

const VoteCreateOption = (props: Props) => {
    const { voteState, voteDispatch } = useContext(VoteContext);

    const handleDeleteOption = () => {
        if (voteState.answers.length > 2) {
            let answerIndex = voteState.answers.findIndex((currentAnswer: VOTE_ANSWER) => currentAnswer.id === props.answer.id)
            voteState.answers.splice(answerIndex, 1);
            voteDispatch({
                type: 'UPDATE_ANSWERS',
                payload: voteState.answers
            });
        }

    };
    const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let answerIndex = voteState.answers.findIndex((currentAnswer: VOTE_ANSWER) => currentAnswer.id === props.answer.id)
        voteState.answers[answerIndex].value = e.target.value;
        voteDispatch({
            type: 'UPDATE_ANSWERS',
            payload: voteState.answers
        })
    }

    return (
        <Col span={18}  >
            <Row className="voteCreate-options-row">
                <Col span={20}>
                    <Input value={props.answer.value} className="voteCreate-input-option" onChange={handleOnInputChange} />
                </Col>
                {
                    (voteState.answers.length > 2) &&
                    <Col span={4}>
                        <Button className="voteCreate-input-deleteBtn" onClick={handleDeleteOption}>{"X"}</Button>
                    </Col>
                }
            </Row>
        </Col>
    );
};

export { VoteCreateOption };