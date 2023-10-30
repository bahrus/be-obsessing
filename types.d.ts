import { ActionOnEventConfigs } from "trans-render/froop/types";
import {IBE} from 'be-enhanced/types';

export interface EndUserProps extends IBE{
    About?: Array<AboutStatement>,
    about?: Array<AboutStatement>
}

export interface AllProps extends EndUserProps{
    isParsed?: boolean,
    sessionStorageRules?: Array<SessionStorageRule>,
}

export type AboutStatement = string;

export type AP = AllProps;

export type PAP = Partial<AP>;

export type ProPAP = Promise<PAP>;

export type POA = [PAP | undefined, ActionOnEventConfigs<PAP, Actions>];

export interface Actions{
    onCamelized(self: this): ProPAP;
    hydrate(self: this): ProPAP;
    noAttrs(self: this): ProPAP;
}

export interface SessionStorageRule{
    key: string,
}

export interface ISessionStorageItemSetEventDetail {
    key: string,
    oldValue: any,
    newValue: any
}