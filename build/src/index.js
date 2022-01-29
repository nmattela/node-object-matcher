Object.defineProperty(exports, "__esModule", { value: true });
function WithMatcher(Base) {
    return class WithMatcher extends Base {
        match(cases) {
            let names = [];
            let prototype = Object.getPrototypeOf(this);
            while (prototype !== null) {
                names = [...names, prototype.constructor.name];
                prototype = Object.getPrototypeOf(prototype);
            }
            const findCase = (names) => {
                if (names.length > 0) {
                    const [head, ...tail] = names;
                    const cse = cases[head];
                    if (cse) {
                        console.log(this, Base);
                        //return cse(this)
                    }
                    else {
                        findCase(tail);
                    }
                }
                else {
                    return cases["default"](this);
                }
            };
            return findCase(names);
        }
    };
}
exports.default = WithMatcher;
//# sourceMappingURL=index.js.map