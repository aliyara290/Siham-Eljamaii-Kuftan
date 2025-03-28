import React from "react";
import styled from "styled-components";
import Heading from "../components/heading/Heading";
import SubHeading from "../components/heading/SubHeading";
import Button from "../components/button/Button";
import { useNavigate } from "react-router-dom";

const StyledNotFound = styled.div`
  width: 100%;
  height: 100svh;
  background-color: var(--neutral-50);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
`;

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <StyledNotFound>
      <Heading title={"OOPS"} size={"big"} weight={500} />
      <SubHeading
        title={
          "We can't find what you're looking for here. Click below to check our bestseller products."
        }
        size={"lg"}
        weight={500}
      />
      {/* <div onClick={() => navigate(-1)}> */}
        <Button onClick={() => navigate(-1)} bg={true} link={false} title={"Go back"} />
      {/* </div> */}
    </StyledNotFound>
  );
};

export default NotFound;
