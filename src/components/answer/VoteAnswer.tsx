import { Row, Col, Button, Radio, Form } from 'antd';
import React, { useState, useContext } from 'react';
import { VoteContext } from '../../context';
import type { VOTE_ANSWER } from '../../Vote.types';


type Props = {};

type State = {};

const VoteAnswer = (props: Props) => {
    const { voteState, voteDispatch } = useContext(VoteContext);

    const [answerForm] = Form.useForm();
    const HandleOnClickEvent = (values: any) => {
        voteDispatch({
            type: 'UPDATE_ANSWERS',
            payload: [
                ...voteState.answers.map((currentAnswer: VOTE_ANSWER) => {
                    if (values.answer === currentAnswer.id) {
                        return {
                            id: currentAnswer.id,
                            value: currentAnswer.value,
                            count: currentAnswer.count + 1
                        }
                    } else {
                        return currentAnswer;
                    }

                })
            ]
        });
    };
    return (
        <>
            <Row justify="center">
                <h4>{voteState.question}</h4>
            </Row>
            <Form form={answerForm} onFinish={HandleOnClickEvent}>
                <Form.Item name="answer" label="Radio.Group">
                    <Radio.Group>
                        {
                            voteState.answers.map((answer: VOTE_ANSWER) => {
                                return <Radio key={answer.id} value={answer.id}>{answer.value}</Radio>;
                            })
                        }
                    </Radio.Group>
                </Form.Item>
                <Row justify="end">
                    <Button htmlType="submit" >Vote</Button>

                </Row>
            </Form>
        </>
    );
};

export { VoteAnswer };