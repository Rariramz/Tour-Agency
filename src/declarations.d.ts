declare module '*.png';
declare module '*.svg';
declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}
declare const __IS_DEV__: boolean;
