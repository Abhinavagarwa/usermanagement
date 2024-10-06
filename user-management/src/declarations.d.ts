declare module 'react-loader-spinner' {
    import * as React from 'react';
  
    export interface LoaderProps {
      type: string;
      color: string;
      height: number;
      width: number;
    }
  
    export default class Loader extends React.Component<LoaderProps> {}
  }
  