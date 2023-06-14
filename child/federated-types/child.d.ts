/// <reference types="react" />
declare module "child/Button" {
    import React from 'react';
    type ButtonProps = {
        size: 'small' | 'large';
    };
    const Button: React.FC<ButtonProps>;
    export default Button;
}
declare module "child/App" {
    const App: () => JSX.Element;
    export default App;
}
