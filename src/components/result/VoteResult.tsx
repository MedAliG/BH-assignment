import React, { useContext } from 'react';
import { VoteContext } from '../../context';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';
import { Row, Col } from 'antd';
import type { VOTE_ANSWER } from '../../Vote.types';
import "./VoteResult.css";

type Props = {};

const VoteResult = (props: Props) => {
    const { voteState } = useContext(VoteContext);

    return (
        (voteState.answers.length > 1 && voteState.question.length) ?
            <div className="voteResult-container">
                <Col span={22} offset={2}>
                    <Row>
                        <h4 className="voteResult-chart-title">"{`${voteState.question}`}" results    </h4>
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
                            style={{
                                data: { fill: "tomato", width: 16 }
                            }}
                            animate={{
                                onExit: {
                                    duration: 500,
                                    before: () => ({
                                        _y: 0,
                                        fill: "orange",
                                        label: "removed"
                                    })
                                }
                            }}

                        />
                    </VictoryChart>
                    <Row>
                        <h3 className="voteResult-chart-count">Total votes: {voteState.answers.reduce((sum: number, currentValue: VOTE_ANSWER) => sum + currentValue.count, 0)}</h3>
                    </Row>
                </Col>
            </div>
            :
            <Row className="voteResult-container" justify="center">
                <h2 className="voteResult-pre-title">
                    Vote to preview the statistics on the data submitted!
                        </h2>

            </Row>
    );
};

export { VoteResult };


