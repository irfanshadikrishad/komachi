function insert_Into_Array(toInsertString, arrayToBeInsertedTo) {
  arrayToBeInsertedTo((prevFormat) => {
    if (!prevFormat.includes(toInsertString)) {
      return [...prevFormat, toInsertString];
    }
    return prevFormat;
  });
}

const slisor = (str, length) => {
  if (str.length <= length) return str;

  // Find the position to slice
  let slicePos = length;
  while (slicePos > 0 && str[slicePos] !== " ") {
    slicePos--;
  }

  // If no space was found, return the original string up to the length
  if (slicePos === 0) return str.slice(0, length);

  // Slice the string at the space position
  return str.slice(0, slicePos);
};

export { insert_Into_Array, slisor };
