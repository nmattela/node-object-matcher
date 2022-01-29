Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../src");
class PersonBase {
}
const Person = (0, src_1.default)(PersonBase);
class Professor extends Person {
}
class Student extends Person {
}
function main() {
    const person = new Student();
    const hello = person.match({
        "Person": (p) => "I am just a normal person",
        "Student": (s) => "I am a student",
        "Professor": (p) => "I am a professor",
        "default": (a) => "In case things go wrong"
    });
    console.log(hello);
}
main();
//# sourceMappingURL=test.js.map