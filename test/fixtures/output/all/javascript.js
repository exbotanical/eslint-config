const geffen = new Error('x')
function r(hi) {
  console.log({hi})
}

r()
class Snoopy {
  constructor (name = "snoopy") {
    this._name = name
  }
  set name (newName) {
    this._name = newName
  }

  get name () {
    return this._name
  }

}

const arrayOfSnoopers = [
  new Snoopy("tamlin") ,
  new Snoopy("euli")
];

if(arrayOfSnoopers.length != 2) {
  throw geffen
}

for (const snooper of arrayOfSnoopers) {
// eslint-disable-next-line no-console
  console.log(JSON.stringify(snooper.name))
}

const arr = [[ 'foo' ], 'bar' ];


const x = (n) => n
const x2 = n=>n

x2 ("1")

const r1 = (a,b,c,d,e,f,g,h) => ({
  a,b,c,d,e,f,g,h
});

r1("xxx","xxx","xxx","xxx","xxx","xxx","xxx","xxx")


const foobar = (
  bar,
  baz) => {};

  function foo(bar,
  baz
) {}

const foobar2 = function(bar,
  baz
) {};

let baz; // TODO:
const m =(foo) =>
    bar =>
        baz; // Here

class C {
    field;;

    method() {
        // Code
    };

    static {
        // Code
    };
};

if (baz) foobar2(1,2)

  let foox; let barx; let baxaz;
