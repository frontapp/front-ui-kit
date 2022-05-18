/*
 * Constants.
 */

const hoverParentClass = 'front-hover-parent';
const hoverClass = 'front-hover';

export const hoverSelector = buildHoverSelector();
export const directHoverSelector = buildDirectHoverSelector();

/*
 * Methods.
 */

export function buildHoverSelector(pseudoElement = '') {
  return `
    .${hoverParentClass}:hover &&${pseudoElement},
    .${hoverParentClass}.${hoverClass} &&${pseudoElement}
  `;
}

export function buildDirectHoverSelector(pseudoElement = '') {
  return `
    &.${hoverParentClass}:hover${pseudoElement},
    &.${hoverParentClass}.${hoverClass}${pseudoElement},
    .${hoverParentClass}:hover > &&${pseudoElement},
    .${hoverParentClass}.${hoverClass} > &&${pseudoElement}
  `;
}

export function buildHoverParentClassName(hasHover?: boolean, baseClassName: string = '') {
  const className = `${hoverParentClass}${baseClassName && ` ${baseClassName}`}`;
  return hasHover ? `${hoverClass} ${className}` : className;
}
