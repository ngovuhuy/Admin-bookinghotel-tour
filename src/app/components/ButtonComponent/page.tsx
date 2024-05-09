import React from "react";
import PropTypes from "prop-types";

// import "./style.css";

interface ButtonProps {
  type?: "primary" | "success" | "error" | "warning" | "red" | "dark" | "light";
  size?: "sm" | "md" | "lg";
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  action?: "button" | "submit" | "reset";
  className?: string;
  children: React.ReactNode;
  title?: string;
  disabled?: boolean;
}

const ButtonComponent: React.FC<ButtonProps> = ({
  type = "primary",
  size = "md",
  onClick,
  style,
  action,
  className,
  children,
  title,
  disabled
}) => {
  const buttonClasses = `button ${type} ${size} ${className}`;

  return (
    <button disabled={disabled} title={title} className={buttonClasses} onClick={onClick} style={style} type={action}>
      {children}
    </button>
  );
};

ButtonComponent.propTypes = {
  type: PropTypes.oneOf(["primary", "success", "error", "warning", "red", "dark", "light"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  style: PropTypes.object,
  onClick: PropTypes.func,
  action: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

// ButtonComponent.defaultProps = {
//   type: "primary",
//   size: "md",
// };

export default ButtonComponent;