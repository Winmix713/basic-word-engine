import React from 'react';
import { Card as HeroUICard, CardBody, CardFooter, CardHeader } from "@heroui/react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  radius?: 'none' | 'sm' | 'md' | 'lg';
  isHoverable?: boolean;
  isPressable?: boolean;
  disableRipple?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  header,
  footer,
  shadow = "md",
  radius = "md",
  isHoverable = false,
  isPressable = false,
  disableRipple = true
}) => {
  return (
    <HeroUICard 
      className={className}
      shadow={shadow}
      radius={radius}
      isHoverable={isHoverable}
      isPressable={isPressable}
      disableRipple={disableRipple}
    >
      {header && <CardHeader>{header}</CardHeader>}
      
      {typeof children === 'string' ? (
        <CardBody>{children}</CardBody>
      ) : (
        children
      )}
      
      {footer && <CardFooter>{footer}</CardFooter>}
    </HeroUICard>
  );
};

export const CardContent: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  return <CardBody className={className}>{children}</CardBody>;
};