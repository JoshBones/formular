import React, { FC } from "react";
import styled from "styled-components";

type Props = {
    errors: string[];
};

const ErrorContainer = styled.div`
    background-color: red;
    padding: 5px;
    margin-bottom: 5px;
    color: white;
`;

const Error: FC<Props> = ({ errors }) =>
    errors.length > 0 && (
        <ErrorContainer>
            <ul>
                {errors.map((e) => (
                    <li key={e}>{e}</li>
                ))}
            </ul>
        </ErrorContainer>
    );

export default Error;
