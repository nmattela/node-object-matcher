import {describe, expect, test} from '@jest/globals';
import { WithMatcher } from "../src";

class PersonBase {

}

const Person = WithMatcher(PersonBase)

class Professor extends Person {

}

class Student extends Person {

}

class PhDStudent extends Student {

}

describe("match works", () => {
    test("It should say that a PhD student is a student", () => {
        const person = new PhDStudent()
    
        const hello = person.match({
            PersonBase: (p: PersonBase) => "I am just a normal person",
            Student: (s: Student) => "I am a student",
            Professor: (p: Professor) => "I am a professor",
            "default": (a: any) => "In case things go wrong"
        })
    
        expect(hello).toBe("I am a student")
    })

    test("It should say that a PhD student is a PhD student, not a student", () => {
        const person = new PhDStudent()
    
        const hello = person.match({
            PersonBase: (p: PersonBase) => "I am just a normal person",
            Student: (s: Student) => "I am a student",
            PhDStudent: (p: PhDStudent) => "I am a PhD student",
            Professor: (p: Professor) => "I am a professor",
            "default": (a: any) => "In case things go wrong"
        })
    
        expect(hello).toBe("I am a PhD student")
    })
})