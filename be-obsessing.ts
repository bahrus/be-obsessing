import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, SessionStorageRule} from './types';
import {register} from 'be-hive/register.js';
import {getRemoteProp, getLocalSignal} from 'be-linked/defaults.js';
import {init} from './api.js';
init();

export class BeObsessing extends BE<AP, Actions> implements Actions{
    static override get beConfig(){
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        } as BEConfig;
    }
    async noAttrs(self: this): ProPAP {
        const {enhancedElement} = self;
        
        return {
            sessionStorageRules: [{
            }] as Array<SessionStorageRule>
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

    async hydrate(self: this){
        const {enhancedElement, sessionStorageRules} = self;
        for(const rule of sessionStorageRules!){
            const {key} = rule;
            if(key === undefined){
                const localSignal = await getLocalSignal(enhancedElement);
                const remoteProp = getRemoteProp(enhancedElement);
                console.log({localSignal, remoteProp});
                const {signal, type, prop} = localSignal;
                const updateSSFn = () => {
                    debugger;
                    sessionStorage.setItem(remoteProp, (<any>signal)[prop!])
                }
                updateSSFn();
            }
        }
        return {
            resolved: true
        };
            
    }
    passToLocal(self: this, newVal){

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

