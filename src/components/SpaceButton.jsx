'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Github, Linkedin, Twitter, FileText, Code } from 'lucide-react';


const SpaceButton = ({ label = "SPACE", href = "/", imgsrc = "../../spacebutton3.jpg" }) => {
  const iconOnlyLabels = ["GITHUB", "LinkedIn", "X", "Resume", "Leetcode"];
  const isIconOnly = iconOnlyLabels.includes(label);

  const renderIcon = () => {
    switch (label.toLowerCase()) {
      case "github":
        return <Github className="w-6 h-6 text-white" />;
      case "linkedin":
        return <Linkedin className="w-6 h-6 text-white" />;
      case "x":
        return <Twitter className="w-6 h-6 text-white" />;
      case "resume":
        return <FileText className="w-6 h-6 text-white" />;
      case "leetcode":
        return <Code className="w-6 h-6 text-white" />;
      default:
        return null;
    }
  };

  return (
    <StyledWrapper $iconOnly={isIconOnly}>
      <Link href={href} target={href.startsWith("http") ? "_blank" : "_self"} className="btn">
        {isIconOnly ? (
          <div className="flex items-center justify-center">
            {renderIcon()}
          </div>
        ) : (
          <strong>{label}</strong>
        )}
        {/* <div id="container-stars">
          <img src={imgsrc} alt="" />
        </div> */}
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${(props) => (props.$iconOnly ? '3rem' : '13rem')};
    height: ${(props) => (props.$iconOnly ? '3rem' : '3rem')};
    background-size: 300% 300%;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    transition: 0.5s;
    animation: gradient_301 5s ease infinite;
    border: double 4px transparent;
    background-image: linear-gradient(#212121, #212121), linear-gradient(137.48deg, #4e1f5f 10%, #0d226a 45%, #8F51EA 67%, #0044ff 87%);
    background-origin: border-box;
    background-clip: content-box, border-box;
    position: relative;
    overflow: hidden;
    text-decoration: none;
  }

  #container-stars {
    position: fixed;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
    backdrop-filter: blur(1rem);
    border-radius: 5rem;
    opacity: 0.5;
  }

  strong {
    z-index: 2;
    font-family: 'Avalors Personal Use';
    font-size: 19px;
    letter-spacing: 5px;
    color: #FFFFFF;
    text-shadow: 0 0 1px white;
  }

  .btn:hover #container-stars {
    z-index: 1;
    background-color: #212121;
  }

  .btn:hover {
    transform: scale(1.1);
  }

  .btn:active {
    border: double 4px #FE53BB;
    animation: none;
  }

  @keyframes gradient_301 {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
`;

export default SpaceButton;
