
type Constructor = new (...args: any[]) => {};

interface Cases<T> {
    [pattern: string]: (object: any) => T,
    default: (object: any) => T
}

export default function WithMatcher<TBase extends Constructor>(Base: TBase) {
    return class WithMatcher extends Base {
        public match<T>(cases: Cases<T>): T {
            let names = []
            let prototype = Object.getPrototypeOf(this)
            while(prototype !== null) {
                names = [...names, prototype.constructor.name]
                prototype = Object.getPrototypeOf(prototype)
            }

            const findCase = (names: Array<string>) => {
                if(names.length > 0) {
                    const [head, ...tail] = names
                    const cse = cases[head]
                    if(cse) {
                        return cse(this)
                    } else {
                        findCase(tail)
                    }
                } else {
                    return cases["default"](this)
                }
            }
            return findCase(names)
        }
    }
}