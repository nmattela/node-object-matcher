
type Constructor = new (...args: any[]) => {};

interface Cases<T> {
    [pattern: string]: (object: any) => T,
    default: (object: any) => T
}

export function match<M, C>(toMatch: M, cases: Cases<C>) {
    let prototype = Object.getPrototypeOf(toMatch)
    while(prototype !== null) {
        const possibleCase = cases[prototype.constructor.name]
        if(possibleCase !== undefined) {
            return possibleCase(toMatch)
        }
        prototype = Object.getPrototypeOf(prototype)
    }
    return cases["default"](toMatch)
}

export function WithMatcher<TBase extends Constructor>(Base: TBase) {
    return class WithMatcher extends Base {
        public match<T>(cases: Cases<T>): T {
            return match(this, cases)
        }
    }
}

