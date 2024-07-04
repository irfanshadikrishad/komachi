function insert_Into_Array(toInsertString, arrayToBeInsertedTo) {
  arrayToBeInsertedTo((prevFormat) => {
    if (!prevFormat.includes(toInsertString)) {
      return [...prevFormat, toInsertString];
    }
    return prevFormat;
  });
}

export { insert_Into_Array };
