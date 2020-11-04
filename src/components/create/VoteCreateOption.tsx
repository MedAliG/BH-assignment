import React, { useState, useContext } from 'react';
import { Input, Row, Col, Button, message } from 'antd';
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
        if (voteState.answers.length > 2) {
            let answerIndex = voteState.answers.findIndex((currentAnswer: VOTE_ANSWER) => currentAnswer.id === props.answer.id)
            voteState.answers.splice(answerIndex, 1);
            voteDispatch({
                type: 'UPDATE_ANSWERS',
                payload: voteState.answers
            });
        } else {
            message.error('You must have more then 2 option!');
        }

    };

    return (
        <Col span={24}>
            <Row>
                <Col span={20}>
                    <Input value={props.answer.value} />
                </Col>
                {
                    (voteState.answers.length > 2) &&
                        <Col span={4}>
                            <Button onClick={handleDeleteOption}>{"X"}</Button>
                        </Col>
                }
            </Row>
        </Col>
    );
};

export { VoteCreateOption };