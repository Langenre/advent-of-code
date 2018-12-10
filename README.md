## Lessons learned / Javascript obscurities

#### [The Tail Call Optimization Catastrophe](https://bugs.chromium.org/p/v8/issues/detail?id=4698)

V8, the JavaScript engine in Chrome, had TCO support for a while, but as of November 2017 it no longer does. There is no active development on TCO in V8, and none is planned. You can read the details in the V8 tracking bug for it.
In NodeJS version 8 and later, TCO is not available. Therefore following code will fail:

    function recursiveTailCall() {
        return recursiveTailCall()
    }
  
RangeError: Maximum call stack size exceeded

#### [The Great Semicolon Debacle Of 2012](https://github.com/twbs/bootstrap/issues/3057)

    console.log('Hello World')
    ['h', 'e', 'y'].forEach((letter) => console.log(letter))
  
The JavaScript parser will automatically add a semicolon when, during the parsing of the source code, it finds [particular situations](https://flaviocopes.com/javascript-automatic-semicolon-insertion/). Otherwhise lines get appended. Therefore JavaScript tries to interpret the code as:

    console.log('Hello World')['h', 'e', 'y'].forEach((letter) => console.log(letter))
    
Uncaught ReferenceError: x is not defined at <anonymous>:2:4

    function abc() { return 
        1; }

This function returns undefined when called.

#### The Array Incident That Left Everyone Shocked

    let twoDimensionalArray = Array(12).fill(Array(64).fill('.'))	
    
There is a difference... 

    let twoDimensionalArray = Array(12).fill().map(y => Array(64).fill('.'))
    

  
