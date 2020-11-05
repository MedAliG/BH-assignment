import React from 'react';
import { Row, Col, Typography } from 'antd';
import './header.css';

type Props = {};

type State = {};

const HeaderBar = (props: Props) => {
    const { Title } = Typography;
    return (
        <Row className="header" style={{margin:0}} justify="center">
            <img className="logo" src="https://blueharvest.io/static/logo-3d9b6c4ada0394636b71fcd721c32fe4.png" />
        </Row>
    );
}

export { HeaderBar };