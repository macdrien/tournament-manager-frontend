const findDuplicates = (array) => {
  array = array.filter(elt => elt.length);
  if ( array.length < 2 ) {
    return [];
  }

  const duplicates = [];
  for (let counter = 0 ; counter < array.length - 1 ; counter++) {
    const lastIndex = array.lastIndexOf(array[counter]);
    if (counter !== lastIndex) {
      duplicates.push(array[counter]);
    }
  }
  return duplicates;
};

const random = (max) => Math.floor(Math.random() * max);

export { findDuplicates, random };
