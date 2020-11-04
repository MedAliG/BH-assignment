import React, { useState, useContext } from 'react';
import { Input, Row, Col, Button, Form, message } from 'antd';
import { VoteContext } from '../../context';
import type { VOTE_ANSWER } from '../../Vote.types';
import { VoteCreateOption } from './VoteCreateOption';

type Props = {};

type State = {
    answersNumber: number
};

const VoteCreate = (props: Props) => {
    let errorMsg = "";
    const [form] = Form.useForm();
    const { voteState, voteDispatch } = useContext(VoteContext);

    const [compState, setCompState] = useState<State>({
        answersNumber: 2
    });

    const handleCreateOption = (values: { answer: string }) => {
        voteDispatch({
            type: 'UPDATE_ANSWERS',
            payload: [...voteState.answers, { value: values.answer, id: `${new Date().getTime()}`, count: 0 }]
        });
        form.resetFields();
        message.success('Option added successufully');
    };
    const HandleQuestionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        voteDispatch({
            type: 'UPDATE_QUESTION',
            payload: e.target.value
        });
    };
    const handleResetOnClickEvent = (values: any) => {
        voteDispatch({
            type: 'UPDATE_ANSWERS',
            payload: []
        });
        voteDispatch({
            type: 'UPDATE_QUESTION',
            payload: ""
        });
    }

    return (
        <>
            <Row>
                <Col span={20}>
                    <Input placeholder="Question?" maxLength={80} onChange={HandleQuestionUpdate} allowClear />
                </Col>
            </Row>
            <Row gutter={[4, 4]}>
                {
                    voteState.answers.map((answer: VOTE_ANSWER) => {
                        return <VoteCreateOption key={answer.id} answer={answer} />;
                    })
                }
            </Row>
            {
                (voteState.answers.length < 10) &&
                <Form form={form} onFinish={handleCreateOption}>
                    <Row gutter={[4, 4]}>
                        <Col span={20}>
                            <Form.Item name="answer">
                                <Input placeholder="Answer ..." />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Button
                                type="primary"
                                htmlType="submit">
                                Add
                                </Button>
                        </Col>
                    </Row>
                </Form>
            }
            <Row gutter={[4, 4]}>
                <Col span={20}>{`${voteState.answers.length}/10 possible answers`}</Col>
                <Col span={8} >
                    <Button onClick={handleResetOnClickEvent}> Reset </Button>
                </Col>
            </Row>
        </>
    );
};

export { VoteCreate };