import {AppBarProps} from "@mui/material";

export interface ICollectionPageHeader {
    type: string,
    setType: any,
}
export interface IAuthLogin {
    email: string,
    password: string,
}
export interface IAuthRegister {
    email: string,
    password: string,
    companyName: string,
}
export interface IAuthPageBase {
    children: any
}
