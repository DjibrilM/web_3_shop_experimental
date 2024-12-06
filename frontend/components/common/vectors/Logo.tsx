import React from "react";

const Logo = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="512"
      height="512"
      x="0"
      y="0"
      viewBox="0 0 24 24"
      xmlSpace="preserve"
      className={className}
    >
      <g>
        <linearGradient
          id="a"
          x1="1"
          x2="23"
          y1="12"
          y2="12"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#02beff"></stop>
          <stop offset="1" stopColor="#535bff"></stop>
        </linearGradient>
        <switch>
          <g>
            <path
              fill="url(#a)"
              d="M22 5H2c-.6 0-1 .4-1 1v4c0 1.3.8 2.4 2 2.8V22c0 .6.4 1 1 1h16c.6 0 1-.4 1-1v-9.2c1.2-.4 2-1.6 2-2.8V6c0-.6-.4-1-1-1zm-7 2h2v3c0 .6-.4 1-1 1s-1-.4-1-1zm-4 0h2v3c0 .6-.4 1-1 1s-1-.4-1-1zM7 7h2v3c0 .6-.4 1-1 1s-1-.4-1-1zm-3 4c-.6 0-1-.4-1-1V7h2v3c0 .6-.4 1-1 1zm10 10h-4v-2c0-1.1.9-2 2-2s2 .9 2 2zm5 0h-3v-2c0-2.2-1.8-4-4-4s-4 1.8-4 4v2H5v-8.2c.4-.1.7-.3 1-.6 1.1 1 2.9 1 4 0 1.1 1 2.9 1 4 0 1.1 1 2.9 1 4 0 .3.3.6.5 1 .6zm2-11c0 .6-.4 1-1 1s-1-.4-1-1V7h2zM4.3 3H20c.6 0 1-.4 1-1s-.4-1-1-1H4.3c-.6 0-1 .4-1 1s.4 1 1 1z"
              opacity="1"
            ></path>
          </g>
        </switch>
      </g>
    </svg>
  );
};

export default Logo;
