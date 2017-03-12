export default function generate() {
  return [
    'This is a string with no formatting',
    '^rRed ^wWhite and ^bBlue^w, baby!',
    'another ^gstring',
    'This 123 is a string with no formatting',
    '^rRed 123 ^wWhite and ^bBlue^w, baby!',
    'another 123 ^gstring',
    'This is a 123string with no formatting',
    '^rRed ^wWhite and123  ^bBlue^w, baby!' +
    '^rRed ^wWhite and ^bBlue^w, baby! ^rRed' +
    ' ^wWhite and ^bBlue^w, baby! ^rRed' +
    ' ^wWhite and ^bBlue^w, baby! ^rRed ^wWhite' +
    ' and ^bBlue^w, baby! ^rRed' +
    ' ^wWhite and ^bBlue^w, baby!',
    'another ^gstring123',
  ];
}
