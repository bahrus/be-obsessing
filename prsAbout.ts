import {AP, ProPAP, PAP, SessionStorageRule} from './types';
import {RegExpOrRegExpExt} from 'be-enhanced/types';
import {arr, tryParse} from 'be-enhanced/cpu.js';

const reAboutStatement: Array<RegExpOrRegExpExt<Partial<SessionStorageRule>>> = [
    {
        regExp: new RegExp(String.raw `^(?<key>.*)`),
        defaultVals:{},
    }
]
export function prsAbout(self: AP) : Array<SessionStorageRule> {
    const {about, About} = self;
    const both = [...(About || []), ...(about || [])]
    const sessionStorageRules: Array<SessionStorageRule> = [];
    for(const aboutStatement of both){
        const test = tryParse(aboutStatement, reAboutStatement) as SessionStorageRule;
        if(test === null) throw 'PE';
        test.key = test.key.replaceAll(':', '.');
        sessionStorageRules.push(test);
    }
    return sessionStorageRules;
}