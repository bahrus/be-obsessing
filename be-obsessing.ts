import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, SessionStorageRule} from './types';
import {register} from 'be-hive/register.js';

export class BeObsessing extends BE<AP, Actions> implements Actions{
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

    async onCamelized(self: this) {
        const {about, About} = self;
        let sessionStorageRules: Array<SessionStorageRule> = [];
        if((about || About) !== undefined){
            const {prsAbout} = await import('./prsAbout.js');
            sessionStorageRules = prsAbout(self);
        }
        return {
            sessionStorageRules
        }
    }

    hydrate(self: this){
        throw 'NI';
        return {
            resolved: true
        };
            
    }
}

export interface BeObsessing extends AllProps{}

const tagName = 'be-obsessing';
const ifWantsToBe = 'obsessing';
const upgrade = '*';

const xe = new XE<AP, Actions>({
    config: {
        tagName,
        isEnh: true,
        propDefaults:{
            ...propDefaults,
        },
        propInfo: {
            ...propInfo,
        },
        actions: {
            noAttrs: {
                ifAllOf: ['isParsed'],
                ifNoneOf: ['about', 'About']
            },
            onCamelized: {
                ifAllOf: ['isParsed'],
                ifAtLeastOneOf: ['about', 'About']
            },
            hydrate: 'sessionStorageRules'
        }
    },
    superclass: BeObsessing
});

register(ifWantsToBe, upgrade, tagName);

