export function getWidthWithMarginOfElement(node: Element) {
  if (!window || !window.document) return 0;

  const styles = window.getComputedStyle(node);
  const width = getPropertyAsNumber(styles, 'width') || 0;
  const marginLeft = getPropertyAsNumber(styles, 'margin-left') || 0;
  const marginRight = getPropertyAsNumber(styles, 'margin-right') || 0;

  return width + marginLeft + marginRight;
}

function getPropertyAsNumber(computedStyle: CSSStyleDeclaration, propertyName: string): number | null {
  const valueAsString: string = computedStyle.getPropertyValue(propertyName);
  const valueMatch = valueAsString.match(/(.*)px$/); // ComputedStyle calculates everything in pixels. e.g. '12.3px'.
  if (!valueMatch) return null;

  const value = Number(valueMatch[1]);
  return isNaN(value) ? null : value;
}
