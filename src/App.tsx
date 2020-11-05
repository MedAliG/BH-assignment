import React, { useState, useEffect } from 'react';
import { Col, Row, Divider } from 'antd';
import { VoteCreate, VoteAnswer, VoteResult, HeaderBar } from './components';
import { VoteProvider } from './context';
import './App.css';
import 'antd/dist/antd.css';


interface AppProps { }

function App({ }: AppProps) {

  return (
    <>
      <HeaderBar />
      <Row className="top-bar">
        <Col offset={1} ><h1 className="top-bar-title">Sir vote</h1></Col>
        <Divider style={{ borderColor: '#5E6168' }} className="top-bar-divider" plain orientation="left"><p className="top-bar-divider-title">POLL</p></Divider>
      </Row>
      <VoteProvider>
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
    </>
  );

}

export default App;
