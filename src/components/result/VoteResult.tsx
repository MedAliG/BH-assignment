import React, { useState, useContext } from 'react';
import { VoteContext } from '../../context';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';
import { Row, Col, Typography, Button } from 'antd';
import { VoteAnswer } from '../answer/VoteAnswer';
type Props = {};

type State = {};

const VoteResult = (props: Props) => {
    const { voteState, voteDispatch } = useContext(VoteContext);
    const { Title } = Typography;




    return (
        <>
            <Col span={22} offset={2}>
                <Row>
                    <Title level={4}>Result Chart</Title>
                </Row>

                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={15}
                >
                    <VictoryAxis
                        label="Option"
                        style={{
                            axisLabel: { padding: 30 }
                        }}
                        tickValues={voteState.answers}
                        tickFormat={(x) => (` ${x}`)}
                    />
                    <VictoryAxis
                        dependentAxis
                        label="Votes"
                        style={{
                            axisLabel: { padding: 30 }
                        }}
                        domain={[1, Math.max.apply(Math, voteState.answers.map(function (e) { return e.count; }))]}
                        tickFormat={(y) => (`${y}`)}

                    />

                    <VictoryBar
                        data={voteState.answers}
                        x="value"
                        y="count"

                    />
                </VictoryChart>
            </Col>

        </>
    );
};

export { VoteResult };

//domain={[0, Math.max.apply(Math, voteState.answers.map(function (e) { return e.count; }))]}