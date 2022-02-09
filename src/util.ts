export const camelToSnakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

export const objectKeysCamelToSnakeCase = (obj: any): any => {
  const dup = Object.assign({}, obj);
  for (const k in dup) {
    dup[camelToSnakeCase(k)] = dup[k];
    delete dup[k];
  }
  return dup;
}