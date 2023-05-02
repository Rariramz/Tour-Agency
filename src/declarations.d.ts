declare module '*.png';
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}
declare const __IS_DEV__: boolean;
