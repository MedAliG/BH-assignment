import React, { useState, useContext } from 'react';
import { Input, Row, Col, Button, Form } from 'antd';
import { VoteContext } from '../../context';
import type { VOTE_ANSWER } from '../../Vote.types';
import { VoteCreateOption } from './VoteCreateOption';

type Props = {};

type State = {
    answersNumber: number
};

const VoteCreate = (props: Props) => {
    const [form] = Form.useForm();
    const { voteState, voteDispatch } = useContext(VoteContext);
    
    const [compState, setCompState] = useState<State>({
        answersNumber: 2
    });

    const handleCreateOption = (values: { answer: string }) => {
        if (voteState.answers.length < 10) {
            voteDispatch({
                type: 'UPDATE_ANSWERS',
                payload: [...voteState.answers, { value: values.answer, id: `${new Date().getTime()}`, count: 0 }]
            });
        }
    };
    const HandleQuestionUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.value.length < 80){
            voteDispatch({
                type: 'UPDATE_QUESTION',
                payload: e.target.value
            })
        }
    }
    return (
        <>
            <Row >
                <Col span={16} offset={2}><Input placeholder="Question?" onChange={HandleQuestionUpdate} /></Col>
            </Row>
            <Row style={{marginTop:10}}>
                {
                    voteState.answers.map((answer: VOTE_ANSWER) => {
                        return <VoteCreateOption key={answer.id} answer={answer} />;
                    })
                }
            </Row>
            <Form form={form} onFinish={handleCreateOption}>
                <Row>
                    <Col span={16}>
                        <Form.Item name="answer">
                            <Input placeholder="Answer ..." />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Button
                            type="primary"
                            htmlType="submit">
                            Add
                        </Button>
                    </Col>
                </Row>
            </Form>

            <Row >
                <Col span={16} offset={2}>{`${voteState.answers.length}/10 possible answers`}</Col>
                <Col span={6} >
                    <Button> Reset </Button>
                </Col>
            </Row>
        </>
    );
};

export { VoteCreate };