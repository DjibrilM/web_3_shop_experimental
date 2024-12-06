import React from "react";

interface VisibleProps {
  visible: boolean;
  children: React.ReactNode; // Can be any React node, not just elements
  fallBack?: React.ReactNode;
}

const Visible: React.FC<VisibleProps> = ({
  visible,
  children,
  fallBack = null,
}) => {
  return visible ? children : fallBack;
};

export default Visible;
