import { Row, Button, Radio, Form } from 'antd';
import React, { useContext } from 'react';
import { VoteContext } from '../../context';
import type { VOTE_ANSWER } from '../../Vote.types';
import './VoteAnswer.css';

type Props = {};

const VoteAnswer = (props: Props) => {
    const { voteState, voteDispatch } = useContext(VoteContext);
    const [answerForm] = Form.useForm();

    const HandleOnClickEvent = (values: any) => {
        if (voteState.answers.length > 0) {
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
        }
    };

    return (
        (voteState.answers.length > 1 && voteState.question.length) ?
            <>
                <div className="voteAnswer-Container">
                    <Row>
                        <h2 className="voteAnswer-question">{voteState.question}</h2>
                    </Row>
                    <Form form={answerForm} onFinish={HandleOnClickEvent}>
                        <Form.Item name="answer" label="">
                            <Radio.Group>
                                {
                                    voteState.answers.map((answer: VOTE_ANSWER) => {
                                        return (
                                            <Row key={answer.id} className="voteAnswer-option">
                                                <Radio className="VoteAnswer-option-radio" key={answer.id} value={answer.id}>{answer.value}</Radio>
                                            </Row>);
                                    })
                                }
                            </Radio.Group>
                        </Form.Item>
                        <Row justify="end">
                            <Button htmlType="submit" className="voteAnswer-vote-btn">Vote</Button>
                        </Row>
                    </Form></div>
            </>
            :
            <>
                <div className="voteAnswer-Container">
                    <Row justify="center">
                        <h1 className="voteAnswer-pre-emote">(๑￫‿ฺ￩๑)</h1>
                    </Row>
                    <Row justify="center">
                        <h3 className="voteAnswer-pre-title" >
                            Please wait for more answers to be added!
                    </h3>
                    </Row>

                </div>  </>

    );


};

export { VoteAnswer };