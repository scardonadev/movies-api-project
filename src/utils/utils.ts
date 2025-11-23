export interface TypeMovie {
  adult: boolean;
  backdrop_path: string; //'/4BtL2vvEufDXDP4u6xQjjQ1Y2aT.jpg';
  genre_ids: number[]; // [28, 80, 53];
  id: number; //1419406;
  original_language: string; //'zh';
  original_title: string; //'捕风追影';
  overview: string; //'Unos astutos y traicioneros ladrones desafian a la Policía Judicial de Macao. La Policía, que se encontraba en una dura batalla, invita de nuevo al experto en rastreo Huang De Zhong, retirado desde hace muchos años, a unir fuerzas con la joven élite del Departamento de Investigación Criminal de la Policía Judicial. Bajo la colisión de las técnicas tradicionales de rastreo y la alta tecnología, la policía y los criminales luchan con ingenio y valentía, y se lanzan a un duelo entre el bien y el mal parecido al juego del gato y el ratón.';
  popularity: number; //569.877;
  poster_path: string; //'/25OeH0GOuEljJqZoF0HoKxOpq0B.jpg';
  release_date: string; //'2025-08-16';
  title: string; //"The Shadow's Edge";
  video: boolean; //false;
  vote_average: number; //6.3;
  vote_count: number; //89;
}
export interface TypeMovieDetails extends TypeMovie {
  genres: TypeGenre[];
}

export interface TypeGenre {
  id: number; //28;
  name: string; //'Acción';
}

export async function getMoviesById(id: number): Promise<TypeMovieDetails> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=1`
  );
  const data: TypeMovieDetails = await res.json();
  return data;
}

export async function getGenres(): Promise<TypeGenre[]> {
  const res = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=1'
  );
  const data: { genres: TypeGenre[] } = await res.json();
  return data.genres;
}

export async function getPopularMovies(): Promise<TypeMovie[]> {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=1&include_adult=true'
  );
  const data: {
    results: TypeMovie[];
  } = await res.json();
  return data.results.filter((movie: TypeMovie) => movie.poster_path !== null);
}

export async function getMoviesByGenre(
  genreName: string,
  genres: TypeGenre[]
): Promise<TypeMovie[]> {
  const genre = genres.find((g) => g.name.toLowerCase() === genreName.toLowerCase());
  if (!genre) {
    return [];
  }

  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=1&with_genres=${genre.id}&sort_by=popularity.desc`
  );
  const data: {
    results: TypeMovie[];
  } = await res.json();
  return data.results.filter((movie: TypeMovie) => movie.poster_path !== null);
}

export async function getUpcomingMovies(): Promise<TypeMovie[]> {
  const res = await fetch(
    'https://api.themoviedb.org/3/movie/upcoming?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=2'
  );
  let data: {
    results: TypeMovie[];
  } = await res.json();

  if (res.ok) {
    const resSecond = await fetch(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=3'
    );
    let dataSecond: {
      results: TypeMovie[];
    } = await resSecond.json();
    if (resSecond.ok) {
      data.results = data.results.concat(dataSecond.results);

      const resThird = await fetch(
        'https://api.themoviedb.org/3/movie/upcoming?api_key=bf42acf712bba686cfff9820897f4edb&language=es-Co&page=4'
      );
      let dataThird: {
        results: TypeMovie[];
      } = await resThird.json();
      if (resThird.ok) {
        data.results = data.results.concat(dataThird.results);
      }
    }
  }

  if (res.ok) {
    const dataUpcoming = data.results;
    //sort by date ascending
    dataUpcoming.sort((a: TypeMovie, b: TypeMovie) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateA.getTime() - dateB.getTime();
    });

    return dataUpcoming.filter((upc: TypeMovie) => new Date(upc.release_date) >= new Date());
  }

  return data.results.filter((movie: TypeMovie) => movie.poster_path !== null);
}
