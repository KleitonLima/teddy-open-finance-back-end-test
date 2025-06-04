export function toPascalCase(input: string): string {
  const words = input.replace(/[^a-zA-Z0-9]/g, ' ').split(/[\s_]+/);

  const pascalCase = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');

  return pascalCase;
}

export function toKebabCase(input: string): string {
  const kebabCase = input.replace(/[\s_]+/g, '-').toLowerCase();

  return kebabCase;
}
