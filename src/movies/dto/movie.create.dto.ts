export interface MovieCreateDTO {
  title: string;
  year: Date;
  genre: string;
  director: string;
  writer: string;
  imdbRating: string;
  imdbID: string;
  posterUrl: string;

  /*
    if the parameter will be optional, we can put a '?' before the ':'
    */
}
