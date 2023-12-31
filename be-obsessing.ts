import {BE, propDefaults, propInfo} from 'be-enhanced/BE.js';
import {BEConfig} from 'be-enhanced/types';
import {XE} from 'xtal-element/XE.js';
import {Actions, AllProps, AP, PAP, ProPAP, POA, SessionStorageRule} from './types';
import {register} from 'be-hive/register.js';
import {getRemoteProp, getLocalSignal} from 'be-linked/defaults.js';
import {breakTie} from 'be-linked/breakTie.js';
import {init, session_storage_item_set} from './api.js';
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
    #ignoreNextSetItemUpdate: Set<string> = new Set();
    async hydrate(self: this){
        const {enhancedElement, sessionStorageRules} = self;
        for(const rule of sessionStorageRules!){
            const {key} = rule;
            //if(key === undefined){
                const localSignal = await getLocalSignal(enhancedElement, true);
                const remoteProp = key || getRemoteProp(enhancedElement);
                const {signal, type, prop} = localSignal;
                const updateSSFn = () => {
                    const val = (<any>signal)[prop!];
                    this.#ignoreNextSetItemUpdate.add(remoteProp);
                    sessionStorage.setItem(remoteProp, val);
                }

                signal.addEventListener(type, (e: Event) => {
                    updateSSFn();
                });
                const updateEnhEl = () => {
                    let val = sessionStorage.getItem(remoteProp);
                    if(val !== null ) val = val[remoteProp];
                    if(this.#ignoreNextSetItemUpdate.has(remoteProp)){
                        this.#ignoreNextSetItemUpdate.delete(remoteProp);
                        return;
                    }
                    (<any>signal)[prop!] = val;
                }
                window.addEventListener(session_storage_item_set, e => {
                    const key = (<any>e).detail.key;
                    if(key !== remoteProp) return;
                    updateEnhEl();
                });
                const localVal = (<any>signal)[prop!];
                const remoteVal = sessionStorage.getItem(remoteProp);
                const tieBreak = breakTie(localVal, remoteVal)
                const {val, winner} = tieBreak;
                if(winner === 'local'){
                    updateSSFn();
                }else if(winner === 'remote'){
                    updateEnhEl();
                }
                
            //}
        }
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

