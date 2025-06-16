function startGame() {
    //
    // Setup
    //

    var round = 1;
    var points = 0;
    var roundScore = 0;
    var totalScore = 0;
    ranOut = false;
    var distance;
    var detailPic = '';
    var explainerText = '';

    //
    //  Init maps
    //

    svinitialize();
    mminitialize();

    //
    // Scoreboard & Guess button event
    //

    // Init Timer
    resetTimer();


    // Timer
    function timer() {
        count = count-1;
        if (count <= 0) {
            if (round < 5){
                endRound();
            } else if (round >= 5){
                endGame();
            };
            clearInterval(counter);
        }
        $("#timer").html(count);
    };

    // Guess Button
    $('#guessButton').click(function (){
        doGuess();
    });

    // Show detail view with swipe animation
    $('#roundEnd').on('click', '.detailBtn', function () {
        $('#roundEnd').addClass('show-details');
    });

    // Proceed to next round
    $('#roundEnd').on('click', '.nextBtn', function () {
        proceedToNextRound();
    });

    // End of game 'play again' button click
    $('#endGame').on('click', '.playAgain', function () {
        window.location.reload();
    });

    //
    // Functions
    //

    // Reset Timer
    function resetTimer(){
        count = 999999;
        counter = setInterval(timer, 1000);
    }

    function proceedToNextRound(){
        $('#roundEnd').removeClass('show-details').fadeOut(500, function(){
            $('#roundEnd').css('height', 'auto');
        });
        $('#overlay').fadeOut();
        $('#scoreBoard').show();

        if (round < 5){
            round++;
            if(ranOut==true){
                roundScore = 0;
            } else {
                roundScore = points;
                totalScore = totalScore + points;
            }

            $('.round').html('Current Round: <b>'+round+'/5</b>');
            $('.roundScore').html('Last Round Score: <b>'+roundScore+'</b>');
            $('.totalScore').html('Total Score: <b>'+totalScore+'</b>');

            var img = document.getElementById('image');
            img.src = "";

            svinitialize();
            guess2.setLatLng({lat: -999, lng: -999});
            mymap.setView([30, 10], 1);

            resetTimer();
        } else if (round >= 5){
            endGame();
        }
    }

    // Calculate distance between points function
    function calcDistance(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2-lat1);
        var dLon = toRad(lon2-lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    function doGuess(){
        if (ranOut == false){

            // Stop Counter
            clearInterval(counter);

            // Reset marker function
            function resetMarker() {
                //Reset marker
                if (guessMarker != null) {
                    guessMarker.setMap(null);
                }
            };

            // Calculate distance between points, and convert to kilometers
            distance = Math.ceil(calcDistance(window.actualLatLng.lat, window.actualLatLng.lon, window.guessLatLng.lat, window.guessLatLng.lng));

            // Calculate points awarded via guess proximity
            function inRange(x, min, max) {
                return (min <= x && x <= max);
            };

            var earthCircumference = 40075.16;
            var x = 2.00151 - (distance/(earthCircumference/4));
            points = Math.round(2100 * ((1 / (1 + Math.exp(-4 * x + 5.2))) + (1 / (Math.exp(-8 * x + 17.5))) + (1 / (Math.exp(-30 * x + 61.2))) + (500 / (Math.exp(-250 * x + 506.7)))));

            roundScore = points;

            endRound();

        } else {

            // They ran out

        }

        timer();

    };

    function endRound(){

        // If distance is undefined, that means they ran out of time and didn't click the guess button
        if(typeof distance === 'undefined' || ranOut == true){
            $('#roundEnd').html(
                '<div class="slider">'+
                    '<div id="resultContent" class="pane"><p>Dang nabbit! You took too long!.<br/> You didn\'t score any points this round!<br/><br/><button class="btn btn-primary detailBtn" type="button">Continue</button></p></div>'+
                    '<div id="detailContent" class="pane"><img src="'+detailPic+'" class="detailPic"/><p>'+explainerText+'</p><button class="btn btn-primary nextBtn" type="button">Next Round</button></div>'+
                '</div>'
            );
            rminitialize();
            var h = $('#resultContent').outerHeight();
            $('#roundEnd').height(h).fadeIn();
            $('#overlay').fadeIn();
            $('#scoreBoard').hide();

            // Stop Counter
            clearInterval(counter);

            // Reset marker function
            function resetMarker() {
                //Reset marker
                if (guessMarker != null) {
                    guessMarker.setMap(null);
                }
            };

            //window.guessLatLng = '';
            ranOut = false;

            points = 0;

        } else {
            $('#roundEnd').html(
                '<div class="slider">'+
                    '<div id="resultContent" class="pane"><p>Your guess was<br/><strong><h1>'+distance+'</strong>km</h1> away from the actual location,<br/><h2>'+window.locName+'</h2><div id="roundMap"></div><br/> You have scored<br/><h1>'+roundScore+' points</h1> this round!<br/><br/><button class="btn btn-primary detailBtn" type="button">Continue</button></p></div>'+
                    '<div id="detailContent" class="pane"><img src="'+detailPic+'" class="detailPic"/><p>'+explainerText+'</p><button class="btn btn-primary nextBtn" type="button">Next Round</button></div>'+
                '</div>'
            );
            rminitialize();
            var h = $('#resultContent').outerHeight();
            $('#roundEnd').height(h).fadeIn();
            $('#overlay').fadeIn();
            $('#scoreBoard').hide();
        };

        // Reset Params
        ranOut = false;

    };

    function endGame(){

        roundScore = points;
        totalScore = totalScore + points;

        $('#miniMap, #pano, #guessButton, #scoreBoard').hide();
        $('#endGame').html('<h1>Congrats!</h1><h2>Your final score was:</h2><h1>'+totalScore+'!</h1><br/><button class="btn btn-large btn-success playAgain" type="button">Play Again?</button>');
        $('#endGame').fadeIn(500);

        //rminitialize();

        // We're done with the game
        window.finished = true;
    }

    function svinitialize() {
        window.fetch('locations.json')
            .then(function(response) {
                if (response.status !== 200) {
                    console.warn(`Looks like there was a problem. Status Code: ${response.status}`);
                    return;
                }
                response.json().then(function(data) {
                    var i = Math.floor(Math.random() * data.length);
                    var place = data[i];

                    var img = document.getElementById('image');
                    img.src = place.image;
                    window.actualLatLng = {lat: place.lat, lon: place.lon};
                    window.locName = place.label;
                    detailPic = place["detail-picture"] || '';
                    explainerText = place.explainer || '';
                });
            })
            .catch(function(err) {
                console.warn('Fetch Error :-S', err);
            });
    };
}

$(document).ready(function(){
    $('#startButton').on('click', function(){
        $('#welcomeScreen').fadeOut(500, function(){
            startGame();
        });
    });
});
