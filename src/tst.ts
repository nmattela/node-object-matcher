import { match } from "."

class Person {

}

class Professor extends Person {

}

class Student extends Person {

}

class PhDStudent extends Student {
    
    public argument: any
    
    constructor(argument: any) {
        super()
        this.argument = argument
    }
}

function main() {
    const person = new PhDStudent(":d")
    
    const hello = match(person, {
        Person: (p: Person) => "I am just a normal person",
        Student: (s: Student) => "I am a student",
        PhDStudent: (p: PhDStudent) => "I am a PhD student",
        Professor: (p: Professor) => "I am a professor",
        "default": (a: any) => "In case things go wrong"
    })
}

main()