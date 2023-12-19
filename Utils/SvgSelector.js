import { View, Text } from "react-native";
import React from "react";
import { SvgXml } from "react-native-svg";

export default function SvgSelector({ fill, name, w, h }) {
  const data = {
    home: `<svg width="35" height="31" viewBox="0 0 35 31" fill="green" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.2189 0L0 12.9142H4.30473V30.1331H12.9142V21.5237H21.5237V30.1331H30.1331V12.7851L34.4379 12.9142L17.2189 0Z" fill="${fill}"/>
        </svg>`,
    location: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_21_48)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M30 16.875C26.8931 16.875 24.375 19.3931 24.375 22.5C24.375 25.6069 26.8931 28.125 30 28.125C33.1069 28.125 35.625 25.6069 35.625 22.5C35.625 19.3931 33.1069 16.875 30 16.875ZM30 31.875C24.8231 31.875 20.625 27.6788 20.625 22.5C20.625 17.3212 24.8231 13.125 30 13.125C35.1769 13.125 39.375 17.3212 39.375 22.5C39.375 27.6788 35.1769 31.875 30 31.875ZM30 0C17.5744 0 7.5 10.0744 7.5 22.5C7.5 31.9088 26.2594 60.0206 30 60C33.6825 60.0206 52.5 31.7812 52.5 22.5C52.5 10.0744 42.4256 0 30 0Z" fill="${fill}"/>
        </g>
        <defs>
        <clipPath id="clip0_21_48">
        <rect width="60" height="60" fill="white"/>
        </clipPath>
        </defs>
        </svg>`,
    search: `<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M59.415 56.7188L43.9293 41.475C47.9831 37.0687 50.475 31.2563 50.475 24.8438C50.475 11.1187 39.1762 0 25.2375 0C11.2987 0 0 11.1187 0 24.8438C0 38.55 11.2987 49.6687 25.2375 49.6687C31.26 49.6687 36.7838 47.5876 41.1225 44.1188L56.67 59.4186C57.4294 60.1686 58.6575 60.1686 59.415 59.4186C60.1744 58.6874 60.1744 57.4688 59.415 56.7188Z" fill="${fill}"/>
        </svg>
        `,
    mic: ``,
  };
  return <SvgXml xml={data[name]} width={w} height={h} />;
}
