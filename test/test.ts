import WithMatcher from "../src";

class PersonBase {

}

const Person = WithMatcher(PersonBase)

class Professor extends Person {

}

class Student extends Person {

}

function main() {
    const person = new Student()

    const hello = person.match({
        PersonBase: (p) => "I am just a normal person",
        Student: (s) => "I am a student",
        Professor: (p) => "I am a professor",
        "default": (a) => "In case things go wrong"
    })

    console.log(hello)
}

main()
