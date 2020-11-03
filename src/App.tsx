import React, { useState, useEffect } from 'react';
import { Col, Row,Divider } from 'antd';
import { VoteCreate, VoteAnswer, VoteResult } from './components';
import { VoteProvider } from './context';
import './App.css';
import 'antd/dist/antd.css';


interface AppProps { }

function App({ }: AppProps) {

  return (
    <>
      <Row className="header">
        <Col offset={2} ><h1>Sir vote</h1></Col>
        <Divider style={{ borderColor: '#000' }}  plain orientation="left">Question</Divider>
      </Row>
      <VoteProvider>
        <Row>
          <Col span={8}>
            <VoteCreate />
          </Col>
          <Divider type="vertical" style={{ borderColor: '#000',height:100 }}  ></Divider>
          <Col span={8}>
            <VoteAnswer />
          </Col>
          <Col span={8}>
            <VoteResult />
          </Col>
        </Row>
      </VoteProvider>
    </>
  );

}

export default App;
