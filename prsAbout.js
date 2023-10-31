import { tryParse } from 'be-enhanced/cpu.js';
const reAboutStatement = [
    {
        regExp: new RegExp(String.raw `^(?<key>.*)`),
        defaultVals: {},
    }
];
export function prsAbout(self) {
    const { about, About } = self;
    const both = [...(About || []), ...(about || [])];
    const sessionStorageRules = [];
    for (const aboutStatement of both) {
        const test = tryParse(aboutStatement, reAboutStatement);
        if (test === null)
            throw 'PE';
        test.key = test.key.replaceAll(':', '.');
        sessionStorageRules.push(test);
    }
    return sessionStorageRules;
}
