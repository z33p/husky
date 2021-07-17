import React, { MutableRefObject } from "react";
export interface AppContext {
    refNav?: MutableRefObject<HTMLDivElement | null>;
}

export const initialValue: AppContext = {};

const AppContext = React.createContext<AppContext>(initialValue);

export default AppContext;