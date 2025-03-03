var geffen = new Error('x')
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

let arrayOfSnoopers = [
  new Snoopy("tamlin") ,
  new Snoopy("euli")
];

if(arrayOfSnoopers.length != 2) {
  throw geffen
}

arrayOfSnoopers.forEach((snooper) => {
// eslint-disable-next-line no-console
  console.log(JSON.stringify(snooper.name))
})

var arr = [[ 'foo' ], 'bar' ];


const x = (n) => n
const x2 = n=>n

x2 ("1")

const r1 = (a,b,c,d,e,f,g,h) => ({
  a,b,c,d,e,f,g,h
});

r1("xxx","xxx","xxx","xxx","xxx","xxx","xxx","xxx")


var foobar = (
  bar,
  baz) => {};

  function foo(bar,
  baz
) {}

var foobar2 = function(bar,
  baz
) {};

let baz; // TODO:
const m =(foo) =>
    bar =>
        baz; // here

class C {
    field;;

    method() {
        // code
    };

    static {
        // code
    };
};

if (baz) foobar2(1,2)

  var foox, barx, baxaz;
