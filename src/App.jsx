import { useRef, useState } from 'react';
import Wordle from './components/Wordle';

export default function App() {
  const word = 'honky'.toUpperCase();
  const spreadWord = [...word];

  const refs = new Array(5).fill(new Array(5)).map((item) =>
    item.map(() => {
      const ref = useRef();
      return ref;
    })
  );

  console.log({ refs });

  const [submit, setSubmit] = useState({});
  const [letters, setLetters] = useState(
    new Array(5).fill(new Array(5).fill(''))
  );

  const wordle = spreadWord.map(() =>
    spreadWord.map((letter) => ({ letter, guess: null }))
  );

  console.log({ wordle });
  // useEffect(() => {
  //   refs[0].current.focus();
  // }, []);

  const handleChange = ({ value, letter, i, row }) => {
    const valueUpper = value.toUpperCase();

    if (valueUpper === letter) wordle[i].guess = 'yes';
    else if (wordle.some(({ letter }) => letter === valueUpper))
      wordle[i].guess = 'maybe';
    else if (value === '') wordle[i].guess = null;
    else wordle[i].guess = 'no';

    setLetters((prevState) => {
      console.log({ row, i, letter, value });

      return {
        ...prevState,
        [row]: { ...prevState[row], [i]: value.toUpperCase().charAt(0) },
      };
    });
    if (i < 4 && value !== '') refs[row][i + 1].current.focus();
    if (i > 0 && value === '') refs[row][i - 1].current.focus();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      {wordle.map((array, i) => (
        <Wordle
          key={array[0].letter + i}
          {...{ array, letters, handleChange, submit, row: i, refs }}
        />
      ))}
    </div>
  );
}
