var quotesObjArray = [
    {
        name:'Carl Sagan: Astronomer',
            quote:'The universe is a pretty big place. If it’s just us, seems like an awful waste of space.'

    },
    {
        name:'Carl Sagan: Astronomer',
            quote:'It is far better to grasp the universe as it really is than to persist in delusion, however satisfying and reassuring.'
    },
    {

        name:'Neil Armstrong: First astronaut to walk on the Moon',
            quote:'I didn’t feel like a giant. I felt very, very small.'
    },
    {
        name:'Stephen Hawking: Theoretical physicist',
            quote:'I don’t think the human race will survive the next thousand years unless we spread into space.'
    },
    {
        name:'Christa McAuliffe: Teacher and astronaut',
            quote:'Space is for everybody. It’s not just for a few people in science or math, or for a select group of astronauts. That’s our new frontier out there, and it’s everybody’s business to know about space.'
    },
    {

        name:'Konstantin Tsiolkovsky: Rocket scientist who pioneered astronautics',
            quote:'Earth is the cradle of humanity, but one cannot live in a cradle forever.'
    },
    {
        name:"Douglas Adams: Author of `The Hitchhiker's Guide to the Galaxy`",
            quote:'Looking up into the night sky is looking into infinity-distance is incomprehensible and therefore meaningless.'
    },
    {
        name:'Socrates: Philosopher',
            quote:'Man must rise above the Earth—to the top of the atmosphere and beyond—for only thus will he fully understand the world in which he lives.'
    },
    {

        name:'Miles Kington: Journalist',
            quote:'Astronomers, like burglars and jazz musicians, operate best at night.'
    },
    {
        name:'Edwin Hubble: Astronomer',
            quote:'Equipped with his five senses, man explores the universe around him and calls the adventure Science.'
    },
    {
        name:'Sir Fred Hoyle: Astronomer',
            quote:`Space isn't remote at all. It's only an hour's drive away, if your car could go straight upwards.`
    },
    {

        name:'Carl Sagan: Astronomer',
            quote:`Somewhere, something incredible is waiting to be known.`
    },
    {

        name:'Arthur C. Clarke: Science fiction author and futurist',
            quote:'Astronomy, as nothing else can do, teaches men humility'
    },
    {

        name:'Kurt Vonnegut: Author and humorist',
            quote:'The universe is a big place, perhaps the biggest.'
    },
    {

        name:'Peter De Vries: Editor and novelist',
            quote:'The universe is like a safe to which there is a combination. But the combination is locked up in the safe.'
    },
    {

        name:'John Scott Russell: Civil engineer',
            quote:'Astronomy is the science of the harmony of infinite expanse.'
    }
]
let randomQuote1 = quotesObjArray[Math.floor(Math.random()*quotesObjArray.length)];
let randomQuote2 = quotesObjArray[Math.floor(Math.random()*quotesObjArray.length)];
let randomQuote3 = quotesObjArray[Math.floor(Math.random()*quotesObjArray.length)];
let randomQuote4 = quotesObjArray[Math.floor(Math.random()*quotesObjArray.length)];
let randomQuote5 = quotesObjArray[Math.floor(Math.random()*quotesObjArray.length)];

function genRandom(){
    document.getElementById('quote1').innerHTML = JSON.stringify(randomQuote1.quote);
    document.getElementById('quote2').innerHTML = JSON.stringify(randomQuote2.quote);
    document.getElementById('quote3').innerHTML = JSON.stringify(randomQuote3.quote);
    document.getElementById('quote4').innerHTML = JSON.stringify(randomQuote4.quote);
    document.getElementById('quote5').innerHTML = JSON.stringify(randomQuote5.quote);
    document.getElementById('name1').innerHTML = JSON.stringify(randomQuote1.name);
    document.getElementById('name2').innerHTML = JSON.stringify(randomQuote2.name);
    document.getElementById('name3').innerHTML = JSON.stringify(randomQuote3.name);
    document.getElementById('name4').innerHTML = JSON.stringify(randomQuote4.name);
    document.getElementById('name5').innerHTML = JSON.stringify(randomQuote5.name);
}
genRandom();