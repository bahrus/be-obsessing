import { BE, propDefaults, propInfo } from 'be-enhanced/BE.js';
import { XE } from 'xtal-element/XE.js';
import { register } from 'be-hive/register.js';
export class BeObsessing extends BE {
    static get beConfig() {
        return {
            parse: true,
            parseAndCamelize: true,
            isParsedProp: 'isParsed'
        };
    }
    async noAttrs(self) {
        const sessionStorageRules = [];
        throw 'NI';
        return {
            sessionStorageRules: []
        };
    }
    async onCamelized(self) {
        const { about, About } = self;
        let sessionStorageRules = [];
        if ((about || About) !== undefined) {
            const { prsAbout } = await import('./prsAbout.js');
            sessionStorageRules = prsAbout(self);
        }
        return {
            sessionStorageRules
        };
    }
    hydrate(self) {
        throw 'NI';
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
