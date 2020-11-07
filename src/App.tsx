import React from 'react';
import { Col, Row, Button } from 'antd';
import { VoteCreate, VoteAnswer, VoteResult } from './components';
import { VoteProvider } from './context';
import { VOTE_CONF } from './Votes.constants';
import './App.css';

function App() {
  return (
    <VoteProvider>
      <Row className="header" justify="center">
        <img className="logo" src="https://blueharvest.io/static/logo-3d9b6c4ada0394636b71fcd721c32fe4.png" alt="blueharvest logo" />
      </Row>
      <Row className="top-bar" justify="center">
        <div className="top-bar-container">
          <div className="top-bar-content">
            <Col span={12}>
              <p className="top-bar-title top-bar-title-1">
                "Hiregming asignment!"
            </p>
              <h3 className="top-bar-title">
                React project to showcase state management.<br />
                Code in repository, please read the 'readme' file.
            </h3>
              <Button className="top-bar-button" href={"https://github.com/MedAliG/BH-assignment"}>Github repo</Button>
            </Col>
          </div>
        </div>
      </Row>
      <Row className="title-divider">
        <Col span={24}>
          <p className="title-divider-text-1">{VOTE_CONF['STORE']['GENERAL']['USER_NAME']}</p>
        </Col>
        <Col span={24}>
          <p className="title-divider-text-2">A full voting application that displays the data.</p>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <VoteCreate />
        </Col>
        <Col span={9}>
          <VoteAnswer />
        </Col>
        <Col span={9}>
          <VoteResult />
        </Col>
      </Row>
    </VoteProvider>
  );

}

export default App;
