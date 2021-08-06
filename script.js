const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const replay = document.querySelector('.replay')
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');
    const sounds = document.querySelectorAll('.sound-picker button');
    //отображение времени
    const timeDisplay = document.querySelector('.time-display');
    //кнопка выбора времени
    const timeSelect = document.querySelectorAll('.time-select button');
    //длина контура
    const outlineLength = outline.getTotalLength();
    //продолжительность
    let fakeDuration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;
    timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60)}`;

    //возможность выбора разного звука

    sounds.forEach (sound => {
        sound.addEventListener('click', function () {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        });
    });

    //проигрывание звука
    play.addEventListener('click', function () {
        checkPlaying(song);
    });

    replay.addEventListener("click", function () {
        restartSong(song);
    });

    const restartSong = song => {
        let currentTime = song.currentTime;
        song.currentTime = 0;
        console.log("ciao")
    };

    //выбор звука
    timeSelect.forEach(option => {
        option.addEventListener('click', function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
                fakeDuration % 60)}`;
        });
    });

    //остановка и воспроизведение звука
    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    //анимация таймера
    song.ontimeupdate = function () {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        //анимация текста
        timeDisplay.textContent = `${minutes}:${seconds}`;

        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength
        //анимация круга
        outline.style.strokeDashoffset = progress;

        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = '.svg/play.svg';
            video.pause();
        }
    };
};

app();
