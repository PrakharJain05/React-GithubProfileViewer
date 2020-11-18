import React from "react";
import styled from "styled-components";

export const Navbar = () => {
  return (
    <Wrapper>
      <nav>
        <h4>Welcome Onboard!!!</h4>
      </nav>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
padding:1.5rem;
  margin-bottom: 3rem;
  background: var(--clr-white);
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    margin-bottom: 0;
    font-weight: 600;
  }
  }
`;
