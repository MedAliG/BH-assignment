import React, { useState, useContext } from 'react';
import { Input, Row, Col, Button } from 'antd';
import { VoteAnswer } from '../answer/VoteAnswer';
import { VoteContext } from '../../context';
import type { VOTE_ANSWER } from '../../Vote.types';

type Props = {
    answer: VOTE_ANSWER
}

type State = {};

const VoteCreateOption = (props: Props) => {
    const { voteState, voteDispatch } = useContext(VoteContext);

    const handleDeleteOption = () => {
        let answerIndex = voteState.answers.findIndex((currentAnswer: VOTE_ANSWER) => currentAnswer.id === props.answer.id)
        voteState.answers.splice(answerIndex, 1);
        voteDispatch({
            type: 'UPDATE_ANSWERS',
            payload: voteState.answers
        });
    };

    return (
        <Col span={22} offset={2}>
            <Row style={{ marginTop: 10 }}>
                <Col span={18}>
                    <Input value={props.answer.value} />
                </Col>
                <Col span={6}>
                    <Button onClick={handleDeleteOption}>X</Button>
                </Col>
            </Row>
        </Col>
    );
};

export { VoteCreateOption };