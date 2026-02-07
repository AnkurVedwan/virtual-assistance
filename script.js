let button = document.querySelector('button');
let gifVal = document.querySelector('.gif');

function speak(text)
{
    let speakText = new SpeechSynthesisUtterance(text);
    speakText.lang = 'hi-IN';
    window.speechSynthesis.speak(speakText);
}

function wishMe()
{
    speak('hello Ankur, How may i asist you ?');
}
wishMe();

let time = Date().split(' ');
time = time[4].split(':');
let hour = time[0];
let minute = time[1];
let mode;
if(hour===12)
{
    mode = 'PM';
}
else if(hour===24)
{
    hour = hour-12;
    mode = 'AM';
}
if(hour>12)
{
    hour = hour-12;
    mode = 'PM';
}
else{
    mode = 'AM';
}
time = hour+':'+minute+' '+mode;

let todayDate = Date().split(' ');
if(todayDate[1]==='Jan')
{
    todayDate = todayDate[2]+' '+'January';
}
else if(todayDate[1]==='Feb')
{
    todayDate = todayDate[2]+' '+'February';
}
else if(todayDate[1]==='March')
{
    todayDate = todayDate[2]+' '+'March';
}
else if(todayDate[1]==='April')
{
    todayDate = todayDate[2]+' '+'April';
}
else if(todayDate[1]==='May')
{
    todayDate = todayDate[2]+' '+'May';
}
else if(todayDate[1]==='June')
{
    todayDate = todayDate[2]+' '+'June';
}
else if(todayDate[1]==='Aug')
{
    todayDate = todayDate[2]+' '+'August';
}
else if(todayDate[1]==='Sept')
{
    todayDate = todayDate[2]+' '+'September';
}
else if(todayDate[1]==='Oct')
{
    todayDate = todayDate[2]+' '+'October';
}
else if(todayDate[1]==='Nov')
{
    todayDate = todayDate[2]+' '+'November';
}
else if(todayDate[1]==='Dec')
{
    todayDate = todayDate[2]+' '+'December';
}

let currentDay = Date().split(' ');
currentDay = currentDay[0];
if(currentDay==='Mon')
{
    currentDay = 'Monday';
}
else if(currentDay==='Tue')
{
    currentDay = 'Tuesday';
}
else if(currentDay==='Wed')
{
    currentDay = 'Wednesday';
}
else if(currentDay==='Thu')
{
    currentDay = 'Thursday';
}
else if(currentDay==='fri')
{
    currentDay = 'friday';
}
else if(currentDay==='Sat')
{
    currentDay = 'Saturday';
}
else if(currentDay==='Sun')
{
    currentDay = 'Sunday';
}

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new speechRecognition();

function takeComand(message)
{   
    if(message.includes('how are you'))
    {
        speak('I am fine, need any help ?');
    }
    else if(message.includes('who are you'))
    {
        speak('I am a MAX, a virtual assistant created by Ankur Vedwan');
    }
    else if(message.includes('open youtube'))
    {
        speak('opening youtube');
        window.open('https://www.youtube.com/');
    }
    else if(message.includes('on youtube'))
    {
        let messageArr = message.split(' ');
        let lastIndex = messageArr[messageArr.length-1];
        let secondLast = messageArr[messageArr.length-2];
        let finalAns='';
        messageArr.forEach((word) => {
            if(word!=messageArr[0] && word!=lastIndex && word!=secondLast)
            {
                finalAns = finalAns+' '+word;
            }
        });
        speak(`this is the search result for ${finalAns}`);
        window.open(`https://www.youtube.com/results?search_query=${finalAns}`);
    }
    else if(message.includes('open google'))
    {
        speak('opening google');
        window.open('https://www.google.com/');
    }
    else if(message.includes('open whatsapp'))
    {
        speak('opening whatsapp');
        window.open('Whatsapp://');
    }
    else if(message.includes('open spotify'))
    {
        speak('opening spotify');
        window.open('Spotify://');
    }
    else if(message.includes('open chatgpt'))
    {
        speak('opening chatGPT');
        window.open('https://chatgpt.com/?openaicom_referred=true');
    }
    else if(message.includes('open calculator'))
    {
        speak('opening calculator');
        window.open('Calculator://');
    }
    else if(message.includes('on google'))
    {
        let messageArr = message.split(' ');
        let lastIndex = messageArr[messageArr.length-1];
        let secondLast = messageArr[messageArr.length-2];
        let finalAns='';
        messageArr.forEach((word) => {
            if(word!=messageArr[0] && word!=lastIndex && word!=secondLast)
            {
                finalAns = finalAns+' '+word;
            }
        });
        speak(`this is the search result for ${finalAns}`);
        window.open(`https://www.bing.com/search?q=${finalAns}`);
    }
    else if(message.includes('time'))
    {
        speak(time);
    }
    else if(message.includes('date'))
    {
        speak(todayDate);
    }
    else if(message.includes('day'))
    {
        speak(currentDay);
    }
    else if(message==='')
    {
        speak('I cannot hear you');
    }
    else if(message.includes('music'))
    {
        speak('opening music player');
        window.open('http://127.0.0.1:5500/spotify%20site/index.html','_self');
    }
}

recognition.onresult = (event) =>{
    gifVal.style.scale = '0';
    button.style.opacity = '1';

    let transcript = event.results[0][0].transcript;
    transcript = transcript.toLowerCase();
    takeComand(transcript);
}

button.addEventListener('click',()=>{
    gifVal.style.scale = '1';
    button.style.opacity = '0';
    setTimeout(() => {
        gifVal.style.scale = '0';
        button.style.opacity = '1';
    }, 8000);




































































































































































































































































































































































































































































































































































































































































































































    
    recognition.start();
});