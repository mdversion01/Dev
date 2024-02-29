// sharedButtonUtils.js
import { ifDefined } from "lit/directives/if-defined.js";

// List of color classes to append '--text'
export const colorVariants = [
  "primary",
  "secondary",
  "tertiary",
  "success",
  "danger",
  "warning",
  "info",
  "light",
  "dark",
];

// Function to determine button size
export function getButtonSize(size) {
  switch (size) {
    case "xs":
      return "xs";
    case "sm":
      return "sm";
    case "lg":
      return "lg";
    default:
      return "default";
  }
}

export function getButtonTypeClass(iconBtn, size) {
  return iconBtn ? `icon-${size}` : size ? `${size}` : "default";
}

// Function to determine button shape
export function getButtonShape(shape) {
  switch (shape) {
    case "pill":
      return "pill";
    case "circle":
      return "circle";
    case "square":
      return "square";
    default:
      return "";
  }
}

// Function to determine button group layout
export function getButtonGroupLayout(vertical) {
  switch (vertical) {
    case true:
      buttonGroup = "pl-btn-group-vertical";
      break;
    default:
      buttonGroup = "pl-btn-group";
  }
}

export function getGroupDirection(buttonGroup) {
  return `${buttonGroup}`;
}

export function getPlacement(start, end, buttonGroup) {
  return start
    ? `${buttonGroup}-start`
    : end
    ? `${buttonGroup}-end`
    : !start || !end
    ? "pl-btn-group__btn"
    : "";
}

export function getSize(buttonTypeClass) {
  return `${buttonTypeClass}`;
}

export function getShape(buttonShape) {
  return `${buttonShape}`;
}

export function getVariant(outlined, block, variant, ripple) {
  const outlinedClass = outlined ? "pl-btn--outlined" : "";
  const blockClass = block ? "pl-btn--block" : "";
  const rippleEffect = ripple ? "pl-btn-ripple" : "";
  return `${outlinedClass} ${blockClass} ${variant} ${rippleEffect}`;
}

export function getPressed(pressed) {
  return pressed ? "true" : "false";
}

export function constructClassAttribute({
  classNames,
  outlinedClass,
  blockClass,
  variant,
  rippleEffect,
  size,
  shape,
  groupBtn,
  groupDirection,
  placement,
  getClassNames,
}) {
  let classAttribute = "pl-btn";
  classAttribute += classNames ? ` ${classNames}` : "";
  classAttribute += outlinedClass ? ` ${outlinedClass}` : "";
  classAttribute += blockClass ? ` ${blockClass}` : "";
  classAttribute += variant ? ` ${variant}` : "";
  classAttribute += rippleEffect ? ` ${rippleEffect}` : "";
  classAttribute += size ? ` ${size}` : "";
  classAttribute += shape ? ` ${shape}` : "";
  classAttribute += groupBtn ? ` ${groupDirection}` : "";
  classAttribute += groupBtn ? ` ${placement}` : "";
  classAttribute += getClassNames ? ` ${getClassNames() || ""}` : "";

  return classAttribute.trim();
}
