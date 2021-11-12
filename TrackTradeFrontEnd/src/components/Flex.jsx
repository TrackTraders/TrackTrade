import styled from "styled-components";

import Box from "../box";

const Flex = styled(Box)`
    display: ${(props) => (props.inline ? "inline-flex" : "flex")};
`;

export default Flex;
