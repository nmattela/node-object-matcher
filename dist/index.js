Object.defineProperty(exports, "__esModule", { value: true });
exports.WithMatcher = exports.match = void 0;
function match(toMatch, cases) {
    let prototype = Object.getPrototypeOf(toMatch);
    console.log(prototype.constructor);
    while (prototype !== null) {
        const possibleCase = cases[prototype.constructor.name];
        if (possibleCase !== undefined) {
            return possibleCase(toMatch);
        }
        prototype = Object.getPrototypeOf(prototype);
    }
    return cases["default"](toMatch);
}
exports.match = match;
function WithMatcher(Base) {
    return class WithMatcher extends Base {
        match(cases) {
            return match(this, cases);
        }
    };
}
exports.WithMatcher = WithMatcher;
//# sourceMappingURL=index.js.map