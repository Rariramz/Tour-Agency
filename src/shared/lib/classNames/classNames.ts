export type Mods = {
  [key: string]: boolean | undefined;
};

export const classNames = (
  cls: string,
  mods: Mods = {},
  additional: string[] = []
): string => {
  return [
    cls,
    ...additional.filter(Boolean),
    Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([className]) => className)
  ]
    .flat(1)
    .join(' ')
    .trim();
};
