import React, { useState, useContext } from 'react';
import { Input, Row, Col, Button, Form, message } from 'antd';
import { VoteContext } from '../../context';
import type { VOTE_ANSWER } from '../../Vote.types';
import { VoteCreateOption } from './option/VoteCreateOption';
import './VoteCreate.css';

type Props = {};

type State = {
    answersNumber: number,
    lengthState: boolean
};

const VoteCreate = (props: Props) => {

    const [form] = Form.useForm();
    const { voteState, voteDispatch } = useContext(VoteContext);

    const [compState] = useState<State>({
        answersNumber: 2,
        lengthState: false

    });

    const handleCreateOption = (values: { answer: string }) => {
        if (values.answer && values.answer.length) {
            voteDispatch({
                type: 'UPDATE_ANSWERS',
                payload: [...voteState.answers, { value: values.answer, id: `${new Date().getTime()}`, count: 0 }]
            });
            form.resetFields();
            message.success('Option added successufully');
        } else {
            message.error('Please provide an answer');
        }
    };
    const HandleQuestionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 80) {
            compState.lengthState = true;
        }
        voteDispatch({
            type: 'UPDATE_QUESTION',
            payload: e.target.value
        });
    };
    const handleResetOnClickEvent = (values: any) => {

        voteDispatch({
            type: 'UPDATE_QUESTION',
            payload: ""
        });
        voteDispatch({
            type: 'UPDATE_ANSWERS',
            payload: []
        });


    }

    return (
        <>
            <div className="voteCreate-Container">
                <Row justify="center">
                    <Col span={18} >
                        <Input
                            value={voteState.question}
                            placeholder="Question?"
                            className="voteCreate-input-question"
                            maxLength={85}
                            onChange={HandleQuestionUpdate}
                            allowClear bordered={false}
                            disabled={compState.lengthState}
                        />
                    </Col>
                </Row>

                <Row justify="center" className="voteCreate-options-container">
                    {
                        voteState.answers.map((answer: VOTE_ANSWER) => {
                            return <VoteCreateOption key={answer.id} answer={answer} />;
                        })
                    }
                </Row>
                <Row justify="center" className="voteCreate-option-add-container">
                    <Col span={18}>
                        {
                            (voteState.answers.length < 10) &&
                            <Form form={form} onFinish={handleCreateOption}>
                                <Row gutter={[4, 4]}>
                                    <Col span={20}>
                                        <Form.Item name="answer">
                                            <Input className="voteCreate-option-add-input" placeholder="Answer ..." />
                                        </Form.Item>
                                    </Col>
                                    <Col span={4}>
                                        <Button
                                            className="voteCreate-option-add-btn"
                                            type="primary"
                                            htmlType="submit">
                                            Add
                                </Button>
                                    </Col>
                                </Row>
                            </Form>
                        }
                    </Col>
                </Row>

                <Row className="voteCreate-option-count-container" >
                    <Col span={16} offset={1}><h3 className="voteCreate-option-count-text">{`${voteState.answers.length}/10 possible answers`}</h3></Col>
                    <Col span={4} >
                        <Button onClick={handleResetOnClickEvent} className="voteCreate-reset-btn"> Reset </Button>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export { VoteCreate };