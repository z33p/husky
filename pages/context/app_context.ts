import React from "react";

export interface AppContext {
}

export const initialValue: AppContext = {};

const AppContext = React.createContext<AppContext>(initialValue);

export default AppContext;