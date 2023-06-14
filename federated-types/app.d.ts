/// <reference types="react" />
declare module "app/helpers/typedSum" {
    export function typedSum(a: number, b: number): number;
}
declare module "app/pages/Home" {
    import React from "react";
    export default function Home(): React.JSX.Element;
}
declare module "app/App" {
    import React from "react";
    import "./styles/global.css";
    import "./assets/fonts/beermoney.css";
    const App: () => React.JSX.Element;
    export default App;
}
