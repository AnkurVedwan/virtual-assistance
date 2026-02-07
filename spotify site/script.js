let audioElement;
let masterPlay = document.querySelector('[master-play]');
let audioPlay = document.querySelector('input');
let time = document.querySelector('.time-show');
let backSong = document.querySelector('[back-song]');
let frontSong = document.querySelector('[front-song]');
let songName = document.querySelector('.song-name');
let imageMove = document.querySelector('[cover-motion]');
let gifVal = document.querySelector('.gif-val');
let allSongs = document.querySelectorAll('.songs');
let currentSong = document.querySelectorAll('.cur-song');

let songIndex = 0;
let b = 0;

let songList = [
    {song:'bonjour',filePath:'assets/songs/1.mp3',coverPath:'assets/covers/1.jpg'},
    {song:'brown munde',filePath:'assets/songs/2.mp3',coverPath:'assets/covers/2.jpg'},
    {song:'blue eyes',filePath:'assets/songs/3.mp3',coverPath:'assets/covers/3.jpg'},
    {song:'lover',filePath:'assets/songs/4.mp3',coverPath:'assets/covers/4.jpg'},
    {song:'brown rang',filePath:'assets/songs/5.mp3',coverPath:'assets/covers/5.jpg'},
    {song:'love dose',filePath:'assets/songs/6.mp3',coverPath:'assets/covers/6.jpg'},
    {song:'desi kalakar',filePath:'assets/songs/7.mp3',coverPath:'assets/covers/7.jpg'},
    {song:'water',filePath:'assets/songs/8.mp3',coverPath:'assets/covers/8.jpg'},
    {song:'winning speech',filePath:'assets/songs/9.mp3',coverPath:'assets/covers/9.jpg'},
    {song:'naam chale',filePath:'assets/songs/10.mp3',coverPath:'assets/covers/10.jpg'},
]

function songCheck()
{
    audioElement = new Audio(`${songList[songIndex].filePath}`);
    songName.textContent = `${songList[songIndex].song}`;
    time.textContent = '00:00';
    audioPlay.value = 0;
    imageMove.src = `${songList[songIndex].coverPath}`;
    if((audioElement.paused || audioElement.currentTime<=0) && b===1)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        imageMove.classList.add('active-img');
        gifVal.style.opacity = '1';
        currentSong[songIndex].style.opacity = '1';
    }
    playStatus();
}
songCheck();

masterPlay.addEventListener('click',function()
{
    if(audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        imageMove.classList.add('active-img');
        gifVal.style.opacity = '1';
        currentSong[songIndex].style.opacity = '1';
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        imageMove.classList.remove('active-img');
        gifVal.style.opacity = '0';
    }
});

function playStatus()
{
    audioElement.addEventListener('timeupdate',function()
{
    audioPlay.value = ((audioElement.currentTime/audioElement.duration)*100);
    
    let second = parseInt(audioElement.currentTime%60);
    let minute = parseInt(audioElement.currentTime/60);

    let timeVal = time.textContent;
    timeVal = timeVal.split(':');
    let part1 = timeVal[1];
    part1 = part1.split('');

    if(second<10)
    {
       part1[1] = second;
       part1 = part1.join('');
       timeVal[1] = part1;
    }
    else{
       timeVal[1] = second;
    }
    
    let part2 = timeVal[0];
    part2 = part2.split('');
    
    if(minute<10)
    {
        part2[1] = minute;
        part2 = part2.join('');
        timeVal[0] = part2;
    }
    else{
        timeVal[0] = minute;
    }
    timeVal = timeVal.join(':');
    time.textContent = timeVal;
})
}

audioPlay.addEventListener('change',function()
{
    audioElement.currentTime = audioPlay.value/100*audioElement.duration;
})

backSong.addEventListener('click',function()
{
    if(songIndex>0)
    {
        if(audioElement.play)
        {
            audioElement.pause();
        }
        currentSong[songIndex].style.opacity = '0';
        songIndex--;
        songCheck();
    }
})

frontSong.addEventListener('click',function()
{
    if(songIndex<9)
    {
        if(audioElement.play)
        {
            audioElement.pause();
        }
        currentSong[songIndex].style.opacity = '0';
        songIndex++;
        b = 1;
        songCheck();
    }
})

allSongs.forEach((song,index) => {
    song.addEventListener('click',function()
    {
        currentSong[songIndex].style.opacity = '0';
        songIndex = index;
        b = 1;
        if(audioElement.play)
        {
            audioElement.pause();
        }
        songCheck();
    })
});

let startBtn = document.querySelector('.start-btn');
let stopBtn = document.querySelector('.stop-btn');

function speak(text)
{
    let textToSpeek = new SpeechSynthesisUtterance(text);
    textToSpeek.lang = 'en-IN';

    window.speechSynthesis.speak(textToSpeek);
}

let speechRec = SpeechRecognition || webkitSpeechRecognition
let rec = new speechRec();

rec.lang = 'en-IN';

let listening = true;

function takeComand(message)
{
    if(message.includes('play the song') || message.includes('play song'))
    {
        speak('playing the song');
        if(audioElement.paused || audioElement.currentTime<=0)
        {
           audioElement.play();
           masterPlay.classList.remove('fa-circle-play');
           masterPlay.classList.add('fa-circle-pause');
           imageMove.classList.add('active-img');
           gifVal.style.opacity = '1';
           currentSong[songIndex].style.opacity = '1';
        }
    }
    else if(message.includes('pause'))
    {
        if(audioElement.play)
        {
            audioElement.pause();
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add('fa-circle-play');
            imageMove.classList.remove('active-img');
            gifVal.style.opacity = '0';
        }
        speak('song paused');
    }
    else if(message.includes('play next') || message.includes('play the next'))
    {
        speak('playing next song');
        if(songIndex<9)
        {
           if(audioElement.play)
           {
              audioElement.pause();
           }
        currentSong[songIndex].style.opacity = '0';
        songIndex++;
        b = 1;
        songCheck();
        }
    }
    else if(message.includes('play previous') || message.includes('play the previous'))
    {
        speak('playing previous song');
        if(songIndex>0)
    {
        if(audioElement.play)
        {
            audioElement.pause();
        }
        currentSong[songIndex].style.opacity = '0';
        songIndex--;
        songCheck();
    }
    }
    else if(message.includes('play'))
    {
        let songArr = message.split(' ');
        let songPlay = '';
        for(let i=1;i<songArr.length;i++)
        {
            songPlay = songPlay+' '+songArr[i];
        }
        songPlay = songPlay.split('.') || songPlay.split('?');
        songPlay = songPlay[0].trim();
        songPlay = songPlay.toLocaleLowerCase();
        console.log(songPlay);
        if(audioElement.play)
        {
            audioElement.pause();
        }
        songList.forEach((songName,index) => {
            if(songName.song===songPlay)
            {
                currentSong[songIndex].style.opacity = '0';
                speak(`playing ${songPlay} song`);
                songIndex = index;
                b = 1;
                songCheck();
            }
        });
    }
    else if(message.includes('open'))
    {
        speak('opening homepage');
        window.open('http://127.0.0.1:5500/','_self');
    }
}

rec.onresult = (event)=>{
    let transcript = event.results[0][0].transcript;
    transcript = transcript.toLowerCase();
    takeComand(transcript);
}
rec.onend = ()=>{
    if(listening==true)
    {
        rec.start();
    }
}

rec.start();

/*startBtn.addEventListener('click',()=>{
    if(listening===false)
    {
        listening = true;
        rec.start();
        speak('Voice Assistant activated');
    }
    
})*/
stopBtn.addEventListener('click',()=>{
    if(listening===true)
    {
        listening = false;
        rec.stop();
        speak('voice Assistant deactivated');
    }
})