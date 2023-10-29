import { BE } from 'be-enhanced/BE.js';
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
}
