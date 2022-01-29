# Pattern matcher for class instances in JavaScript and TypeScript

Say, you have some classes that extend another class you created
```javascript
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
```javascript
switch (person.constructor.name) {
    case "Person": break;
    case "Student": break;
    case "Professor": break;
}
```

Although at first this seems to work, it actually has some gotchas to it.
For one, it will only look up one level into the inheritance chain.
For example, if we had this:
```javascript
class PhDStudent extends Student {}

const person = new PhDStudent()
```
Then we would expect the PhD student to match with the `case "Student"`.
However, it does not, as the direct class of the PhD student is `PhDStudent`,
not `Student`.

This is where this pattern match library comes into play.
It provides you with a mixin `WithMatcher` that you can apply to the root class
(in this case `Person`)
which works similarly to the switch statement, except that it allows you to
match deeper:
```javascript

class Person {}

const PersonWithMatcher = WithMatcher(Person)

class Professor extends PersonWithMatcher {}
class Student extends PersonWithMatcher {}
class PhDStudent extends Student {}

const person = new PhDStudent()

person.match({
    "PersonWithMatcher": (p: Person) => "Case when person",
    "Professor": (p: Professor) => "Case when professor",
    "Student": (s: Student) => "Case when student, will also fire if person is a PhD student",
    "default": (d: Person) => "In case no branch exists that matches person"
})
```
On top of that, `match` is an expression, so no need for those silly `breaks` and the likes!

## Further work

This library is still under construction.
I am planning to make the pattern matching a bit richer,
possibly allow you to match on constructor arguments
(though I am afraid this may not be possible).