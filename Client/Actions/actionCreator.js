export const actionCreator = (type, ...argNames) => {
  return function (...args) {
    let action = { type };
    argNames.forEach((arg, i) => {
      action[argNames[i]] = args[i];
    });
    return action;
  }
};