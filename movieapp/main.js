$(document).ready(function () {

    $('#submit').on('click', function (e) {
        e.preventDefault();
        let keyword = $('.form-control').val();
        getMovies(keyword);
    });
    

});

let getMovies = function (keyword) {

    $.ajax({
        type: "GET",
        url: "http://www.omdbapi.com/?apikey=e74a7a83&s=" + keyword
    }).done((data) => {

        let movies = data.Search;
        let result = '';
        $.each(movies, function (index, movie) { 
             
            result += `
               <div class="col-md-4">
                    <div class="card">
                        <img class="card-img-top" src="${movie.Poster}" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${movie.Title}</h5>
                            <p class="card-text">Release Date: ${movie.Year}</p>
                            <a href="#" class="btn btn-dark" onclick="movieSelected('${movie.imdbID}')">See more</a>
                        </div>
                    </div>  
               </div>
            `
        });

        $('.result').html(result);

    });

}

function movieSelected(id){
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false
}


function getMovie(){
    let movieId = sessionStorage.getItem('movieId')
    $.ajax({
        type: "GET",
        url: "http://www.omdbapi.com/?apikey=e74a7a83&i=" + movieId,
    }).done((movie) => {
        console.log(movie);
        
        
            let result = `
            <div class="container moviefull">
                <div class="row">
                    <div class="cold-md-5"> 
                        <img src="${movie.Poster}" class="rounded border border-dark ">
                    </div>
                    <div class="cold-md-7"> 
                        <ul class="list-group ">
                            <li class="list-group-item list-group-item-light ">Title: ${movie.Title}</li>
                            <li class="list-group-item list-group-item-light ">Genre: ${movie.Genre}</li>
                            <li class="list-group-item list-group-item-light ">Duration: ${movie.Runtime}</li>
                            <li class="list-group-item list-group-item-light ">Released: ${movie.Released}</li>
                            <li class="list-group-item list-group-item-light ">Director: ${movie.Director}</li>
                            <li class="list-group-item list-group-item-light ">Rated: ${movie.Rated}</li>
                            <li class="list-group-item list-group-item-light ">Production: ${movie.Production}</li>
                            <li class="list-group-item list-group-item-light ">Awards: ${movie.Awards}</li>
                        </ul>
                    </div>
                </div>

                <div class="col-md-12">
                    <h1 class="display-4"> Plot </h1>
                    <hr>
                    <p class="lead"> ${movie.Plot} </p> 
                </div>

                <div class="row">
                    <div class="cold-md-5"> 
                        <a class="btn btn-dark" href="index.html">Back</a>
                        <a class="btn btn-dark" href="http://imdb.com/title/${movie.imdbID}" target="_blank">IMDb Website</a>
                    </div>
                    <div class="cold-md-7 rate">
                        <div class="row">
                            <img src="src/star.png" class="ratelogo ">
                            <p class="h3">  ${movie.imdbRating} / 10 </p>
                        </div>
                    </div> 
                </div>
            </div>    
            
            `
            $('.navbar-header p').html(movie.Title);
            $('#movie').html(result);
            
    });
}
