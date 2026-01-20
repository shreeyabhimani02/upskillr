import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Button = () => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <button className="animated-button" type="button" onClick={() => navigate("/courses")}>
        <svg className="arr-2" viewBox="0 0 24 24">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>

        <span className="text">Start your journey Today</span>
        <span className="circle" />

        <svg className="arr-1" viewBox="0 0 24 24">
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 16px 36px;
    font-size: 17px;
    font-weight: 600;
    background-color: #0049a9;
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 0 0 1px #0326a6;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button svg {
    position: absolute;
    width: 24px;
    fill: white;
    z-index: 9;
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .arr-1 {
    right: 16px;
  }

  .arr-2 {
    left: -25%;
  }

  .circle {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  width: 250%;
  height: 250%;
  background-color: white;
  border-radius: 50%;
  opacity: 1;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  pointer-events: none;
}


  .text {
    position: relative;
    z-index: 1;
    transform: translateX(-12px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
  }

  .animated-button:hover {
    border-radius: 14px;
    color: #ffffff;
  }

  .animated-button:hover .arr-1 {
    right: -25%;
  }

  .animated-button:hover .arr-2 {
    left: 16px;
  }

  .animated-button:hover .text {
    transform: translateX(12px);
  }

  .animated-button:hover svg {
    fill: #ffffff;
  }

  .animated-button:hover .circle {
    width: 220px;
    height: 220px;
    opacity: 1;
  }

  .animated-button:active {
    transform: scale(0.95);
    box-shadow: 0 0 0 2px #ffffff;
  }
`;

export default Button;
