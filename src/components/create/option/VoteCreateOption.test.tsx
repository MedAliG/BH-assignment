import React from 'react';
import { shallow } from 'enzyme';
import { VoteCreateOption } from './VoteCreateOption';

describe("VoteCreate", () => {
    it('renders vote create option', () => {
        shallow(
            <VoteCreateOption
                key="key1"
                answer={{
                    value: "answer1",
                    count: 420,
                    id: 666
                }} />
        );
    });
});