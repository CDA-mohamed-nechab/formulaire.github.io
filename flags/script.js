var countries = ['FRANCE', 'ALLEMAGNE', 'BELGIQUE', 'PAYS BAS', 'TCHAD', 'ARMENIE', 'IRLANDE'];
var googdColors = [['#0000ff', '#ffffff', '#ff0000'], ['#000000', '#ff0000', '#ffcc00'], ['#000000', '#ffff00', '#ff0000'],
['#ae1c28', '#ffffff', '#21468b'], ['#002669', '#ffcc00', '#d20f36'], ['#d90012', '#0033a0', '#f2a800'],
['#169b62', '#ffffff', '#ff883e']];

var countryColor = [['#ffffff', '#ff0000', '#0000ff'], ['#ffcc00', '#000000', '#ff0000'], ['#ffff00', '#ff0000', '#000000'],
['#21468b', '#ffffff', '#ae1c28'], ['#ffcc00', '#d20f36', '#002669'], ['#0033a0', '#f2a800', '#d90012'],
['#ffffff', '#169b62', '#ff883e']];

var colorIndex = 0;
var color0 = '';
var color1 = '';
var color2 = '';
var decomptes;
var decomptesU;
var time = '';
var score = 0;
var finalResults = ''
var numberOfPoint = 0;
var numberOfClick = 0;
var numberOfClickParFlag = 0;
var numberOfPointParFlag = 0;
var pourcentage = 0
var apres = 0;
var seconds = 0;


$(function () {
    $('.btn').eq(0).on('click', resetTheGame)
    $('.btn').last().one('click', function () { })
    if (localStorage.getItem('score') != null) {
        getFromLocalStorage();
        restColor();
        horizontale();
        compteur();
        compteurU();
        $('.btn').eq(1).on('click', function () {
            chekingResult();
        });
        startTheGame();
    } else {
        startNewGame();
    }
    $('#click').html('Clics: ' + numberOfClick);

});
function startNewGame() {
    $('#exampleModalLabel').html('Comment ça marche ?');
    $('.btn').last().html('J\'ai compris')
    $('.modal-body').html('Bonjour! bienvenue sur le jeu des drapeaux<br>Ce jeu consiste à retrouver les couleurs des drapeaux<br>Il suffit de cliquer sur la bande pour changer sa couleur')
    $('#basicExampleModal').modal('show')
    $('.btn').last().one('click', function () {
        compteur();
        compteurU();
        $('.btn').eq(1).on('click', function () {
            chekingResult();
        });
        startTheGame();
    })
}
function getFromLocalStorage() {
    score = parseInt(localStorage.getItem('score'));
    pourcentage = localStorage.getItem('pourcentage');
    numberOfPoint = parseInt(localStorage.getItem('numberOfPoint'));
    finalResults = localStorage.getItem('finalResult');
    colorIndex = parseInt(localStorage.getItem('colorIndex'));
    apres = parseInt(localStorage.getItem('apres'));
    numberOfClick = parseInt(localStorage.getItem('numberOfClick'));
    $('.progress-bar').eq(0).width(pourcentage)

}
function resetTheGame() {
    $('.modal-body').html('Tu veux vraiment reprendre dès le debut ?')
    $('#exampleModalLabel').html('Reset');
    $('#basicExampleModal').modal('show')
    $('.btn').last().html('Reset')
    $('.btn').last().one('click', function () {
        if ($('.btn').last().html() == 'Reset') {
            localStorage.clear();
            location.reload();
        }
    })

}
function startTheGame() {
    var maDiv = $('.divToClone').last().find('.flag');
    $(maDiv).each(function () {
        this.monIndex = 0;
        $(this).on('click', function () {
            $(this).css('background-color', countryColor[colorIndex][this.monIndex]);
            this.monIndex += 1
            this.monIndex = this.monIndex % 3;
            color0 = rgb2hex($(this).parent().find('.flag').eq(0).css('backgroundColor'));
            color1 = rgb2hex($(this).parent().find('.flag').eq(1).css('backgroundColor'));
            color2 = rgb2hex($(this).parent().find('.flag').eq(2).css('backgroundColor'));
            numberOfClick += 1;
            numberOfClickParFlag += 1;
            $('#click').html('Clics: ' + numberOfClick);
        });
    });
}

function chekingResult() {
    if (color0 == googdColors[colorIndex][0] && color1 == googdColors[colorIndex][1] && color2 == googdColors[colorIndex][2]) {
        googdResult();
    } else {
        $('#exampleModalLabel').html('Oups !');
        $('.btn').last().html('Ressayer')
        $('.modal-body').html('Oh, tu ne connais pas ce drapeau !!')
        $('#basicExampleModal').modal('show')
        $('.btn').last().one('click', function () { });
    }
}
function googdResult() {
    score += 1;
    pourcentage = (score * 100) / (countries.length)
    pourcentage = parseInt(pourcentage) + '%'
    $('.progress-bar').eq(0).width(pourcentage)
    if (colorIndex < (countries.length - 1)) {
        if (numberOfClickParFlag < 6) { numberOfPointParFlag = 3; } else if (numberOfClickParFlag < 9) { numberOfPointParFlag = 2; } else { numberOfPointParFlag = 1; }
        numberOfPoint += numberOfPointParFlag;
        $('.modal-body').html(countries[colorIndex] + ' OK ! ' + '<br>' + 'Temps : ' + timeU + '<br>Nombre de clics : (' + numberOfClickParFlag + ')' + '<br>+ ' + numberOfPointParFlag + ' point(s)')
        numberOfPointParFlag = 0;
        finalResult(countries[colorIndex], numberOfClickParFlag)
        clearTimeout(decomptesU);
        clearTimeout(decomptes);
        colorIndex++;
        $('#exampleModalLabel').html('Resulats');
        $('.btn').last().html('Fermer')
        $('#basicExampleModal').modal('show')
        $('.btn').last().one('click', function () {
            restColor();
            horizontale();
            compteur();
            compteurU();
        });
        setLocalStorage();
    }
    else {

        clearTimeout(decomptes);
        localStorage.clear();
        $('#click').html('clics: ' + numberOfClick)
        $('#score').html(score + '/' + + countries.length)
        $('#exampleModalLabel').html('Bravo !');
        $('.btn').last().html('Rejouer')
        $('.modal-body').html('Total des points: ' + numberOfPoint + '<br>' + finalResults)
        $('#basicExampleModal').modal('show')
        $('.btn').eq(1).off();
        $('.btn').last().one('click', function () {
            location.reload();
        });
    }
}
function setLocalStorage() {
    localStorage.setItem('score', score);
    localStorage.setItem('pourcentage', pourcentage);
    localStorage.setItem('numberOfPoint', numberOfPoint);
    localStorage.setItem('finalResult', finalResults);
    localStorage.setItem('colorIndex', colorIndex);
    localStorage.setItem('apres', apres);
    localStorage.setItem('numberOfClick', numberOfClick);
}
function restColor() {
    $('.row').last().find('.flag').each(function (index) {
        this.monIndex = 0;
        $(this).css('backgroundColor', 'wheat')
    });
    $('.title').last().html(countries[colorIndex])
}
function compteur() {
    var startTime = new Date();
    var apresPause = apres;
    decomptes = setInterval(function () {
        seconds = Math.round(
            (new Date().getTime() - startTime.getTime()) / 1000 + apresPause);//
        hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        apres += 1
        time = ajouteUnZero(minutes) + ':' + ajouteUnZero(seconds);
        $('#time').html(time)
    }, 1000);
}
function compteurU() {
    var startTime = new Date();
    decomptesU = setInterval(function () {
        seconds = Math.round(
            (new Date().getTime() - startTime.getTime()) / 1000);//
        hours = parseInt(seconds / 3600);
        seconds = seconds % 3600;
        minutes = parseInt(seconds / 60);
        seconds = seconds % 60;
        timeU = ajouteUnZero(minutes) + ':' + ajouteUnZero(seconds);
        $('.btn').eq(1).html(timeU + ' (' + numberOfClickParFlag + ')')
    }, 1000);
}
function finalResult(a, b) {
    finalResults += a + ': (' + numberOfClickParFlag + ') Clics ' + '[' + timeU + '] ' + '<br>';
    numberOfClickParFlag = 0;
}

function rgb2hex(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
        return ('0' + parseInt(x).toString(16)).slice(-2);
    }
    return '#' + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function ajouteUnZero(a) {
    return (a < 10) ? ('0' + a) : a;
}

function horizontale() {
    if (colorIndex % 2 != 0) {
        $('.row').last().find('.flag').each(function () {
            $(this).removeClass('col-12');
            $(this).addClass('col-4');
        });
    } else {
        $('.row').last().find('.flag').each(function () {
            $(this).removeClass('col-4');
            $(this).addClass('col-12');
        });
    }
    $('.row').last().find('.flag').each(function () {
        $(this).toggleClass('col-4 col-12');
        $(this).css('backgroundColor', 'wheat')
    });
}