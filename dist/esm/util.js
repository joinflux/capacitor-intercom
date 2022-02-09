export const camelToSnakeCase = (str) => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};
export const objectKeysCamelToSnakeCase = (obj) => {
    const dup = Object.assign({}, obj);
    for (const k in dup) {
        dup[camelToSnakeCase(k)] = dup[k];
        delete dup[k];
    }
    return dup;
};
//# sourceMappingURL=util.js.map