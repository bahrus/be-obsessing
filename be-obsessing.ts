import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, SessionStorageRule} from './types';
import {register} from 'be-hive/register.js';

export class BeObsessing extends BE<AP, Actions, HTMLMetaElement | HTMLLinkElement> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }

    async noAttrs(self: this): ProPAP {
        const sessionStorageRules: Array<SessionStorageRule> = [];
        throw 'NI';
        return {
            sessionStorageRules: []
        };
    }
}