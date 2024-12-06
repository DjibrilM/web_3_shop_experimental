import React from "react";
import { ButtonProps } from "@/components/ui/button";
import { Button as BaseButton } from "@/components/ui/button";
import Loader from "../common/vectors/Loader";

interface Props extends ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<Props> = ({ children, isLoading, ...props }) => {
    return (
      <BaseButton {...props} disabled={isLoading}>
        <div className="relative flex items-center justify-center w-full h-full">
          {children || "Submit"}
          {isLoading && (
            <div className="absolute right-4">
              <Loader />
            </div>
          )}
        </div>
      </BaseButton>
    );
};

export default Button;
