const Wordle = ({ array, letters, handleChange, submit, row, refs }) => {
  return (
    <div style={{ display: 'flex' }}>
      {array.map(({ letter, guess }, i) => (
        <input
          value={letters[row][i]}
          key={letter + i}
          ref={refs[row][i]}
          name={letter}
          onChange={({ target: { value } }) =>
            handleChange({ value, letter, i, row })
          }
          style={{
            backgroundColor:
              guess === 'yes' && submit
                ? 'green'
                : guess === 'no'
                ? 'red'
                : guess === 'maybe'
                ? 'darkyellow'
                : 'lightgray',
            color: 'white',
            width: '50px',
            height: '50px',
            margin: '5px',
            border: '1px solid black',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
          }}
        />
      ))}
    </div>
  );
};

export default Wordle;
