import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
import { getRemoteProp, getLocalSignal } from 'be-linked/defaults.js';
import { breakTie } from 'be-linked/breakTie.js';
import { init, session_storage_item_set } from './api.js';
init();
export class BeObsessing extends BE {
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async noAttrs(self) {
        const { enhancedElement } = self;
        return {
            sessionStorageRules: [{}]
        };
    }
    async onCamelized(self) {
        const { about, About } = self;
        let sessionStorageRules = [];
        if ((about || About) !== undefined) {
            const { prsAbout } = await import('./prsAbout.js');
            sessionStorageRules = prsAbout(self);
            console.log({ sessionStorageRules });
        }
        return {
            sessionStorageRules
        };
    }
    async hydrate(self) {
        const { enhancedElement, sessionStorageRules } = self;
        for (const rule of sessionStorageRules) {
            const { key } = rule;
            //if(key === undefined){
            const localSignal = await getLocalSignal(enhancedElement, true);
            const remoteProp = key || getRemoteProp(enhancedElement);
            console.log({ localSignal, remoteProp });
            const { signal, type, prop } = localSignal;
            const updateSSFn = () => {
                sessionStorage.setItem(remoteProp, signal[prop]);
            };
            signal.addEventListener(type, (e) => {
                updateSSFn();
            });
            const updateEnhEl = () => {
                signal[prop] = sessionStorage.getItem(remoteProp);
            };
            window.addEventListener(session_storage_item_set, e => {
                const key = e.detail.key;
                if (key !== remoteProp)
                    return;
                updateEnhEl();
            });
            const localVal = signal[prop];
            const remoteVal = sessionStorage.getItem(remoteProp);
            const tieBreak = breakTie(localVal, remoteVal);
            const { val, winner } = tieBreak;
            if (winner === 'local') {
                updateSSFn();
            }
            else if (winner === 'remote') {
                updateEnhEl();
            }
            //}
        }
        return {
            resolved: true
        };
    }
}
const tagName = 'be-obsessing';
const ifWantsToBe = 'obsessing';
const upgrade = '*';
const xe = new XE({
    config: {
        tagName,
        isEnh: true,
        propDefaults: {
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
