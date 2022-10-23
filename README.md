# Pattern matcher for class instances in JavaScript and TypeScript

## What this library aims to fix
Say, you have some classes that extend another class you created
```typescript
class Person {}

class Student extends Person {}

class Professor extends Person {}
```

And you instantiate one of these classes:
```javascript
const person = new Student()
```

When dealing with this instance,
without knowing to which specific class it belongs,
other than the fact that it is some instance of class `Person`,
you might write something like this:
```typescript
switch (person.constructor) {
    case Person: break;
    case Student: break;
    case Professor: break;
}
```

Although at first this seems to work, it actually has some gotchas to it.
For one, it will only look up one level into the inheritance chain.
For example, if we had this:
```typescript
class PhDStudent extends Student {}

const person = new PhDStudent()
```
Then we would expect the PhD student to match with the `case "Student"`, since `PhDStudent` extends `Student`.
However, it does not, as the direct class of the PhD student is `PhDStudent`,
not `Student`.

This is where this pattern match library comes into play.
It provides you with a function `match`, and a mixin `WithMatcher` that you can apply to the root class
(in this case `Person`).
Match works similarly to the switch statement, except that it allows you to
match deeper:
```typescript

class Person {}

class Professor extends PersonWithMatcher {}
class Student extends PersonWithMatcher {}
class PhDStudent extends Student {}

const person = new PhDStudent()

match(person, {
    Person: (p: Person) => "Case when person",
    Professor: (p: Professor) => "Case when professor",
    Student: (s: Student) => "Case when student, will also fire if person is a PhD student",
    "default": (d: Person) => "In case no branch exists that matches person"
})
```
On top of that, the cases of `match` are expressions, so no need for those silly `breaks` and the likes!

## Use
You can use either the provided `match` function:
```typescript
// Using the match function
import match from 'node-object-matcher'

class Person {}

class Student extends Person {}

class Professor extends Person {}

const person = new Student()

match(person, {
    Person: (p: Person) => "I am simply a person",
    Student: (s: Student) => "I am more than a person, I am a student!",
    Professor: (p: Professor) => "I am more than a person, I am a professor!"
})
```
...or you can use the provided `WithMatcher` mixin:
```typescript
// Using the WithMatcher mixin
import { WithMatcher } from 'node-object-matcher'

class PersonBase {}

const Person = WithMatcher(PersonBase)

class Student extends Person {}

class Professor extends Person {}

const person = new Student()

person.match({
    PersonBase: (p: PersonBase) => "I am simply a person",
    Student: (s: Student) => "I am more than a person, I am a student!",
    Professor: (p: Professor) => "I am more than a person, I am a professor!"
})
```

## Further work

This library is still under construction.
I am planning to make the pattern matching a bit richer,
possibly allow you to match on constructor arguments
(though I am afraid this may not be possible).