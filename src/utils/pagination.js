export const paginationLogic = (currentPage,pokemonsByName) => {
    //cantidad pokx pag
    const POKEMONS_PER_PAGE = 12;
    //pok A MOSTRAR en current page
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonsByName.slice(sliceStart, sliceEnd);
    //last page
    const lastPage = Math.ceil(pokemonsByName.length / POKEMONS_PER_PAGE) || 1;
    //current bloxk
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);

    //pages that will not be displayed in the current block
    const pagesInBlock = [];
    const minPage = (actualBlock - 1)*PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) {
        pagesInBlock.push(i);
      }
    } 


    return { pokemonInPage, lastPage, pagesInBlock };
  };