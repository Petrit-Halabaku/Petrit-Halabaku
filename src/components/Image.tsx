import React from "react";
import { ImageProps } from "../interfaces";

export const Image: React.FC<ImageProps> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} />;
};
