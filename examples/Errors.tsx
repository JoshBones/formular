import React, { FC } from "react";

type Props = {
    errors: string[];
};

const Error: FC<Props> = ({ errors }) =>
    errors.length > 0 && (
        <div style={{ background: "red", padding: 10, color: "white" }}>
            <ul>
                {errors.map((e) => (
                    <li key={e}>{e}</li>
                ))}
            </ul>
        </div>
    );

export default Error;
