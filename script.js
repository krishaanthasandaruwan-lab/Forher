const screens = {
    'start-screen': document.getElementById('start-screen'),
    'video-screen': document.getElementById('video-screen'),
    'music-screen': document.getElementById('music-screen'),
    'game-screen': document.getElementById('game-screen'),
    'reaction-screen': document.getElementById('reaction-screen'),
    'finale-screen': document.getElementById('finale-screen'),
    'happiness-screen': document.getElementById('happiness-screen'),
    'hug-screen': document.getElementById('hug-screen')
};

const introVideo = document.getElementById('intro-video');
const bgMusic = document.getElementById('bg-music');
let currentStage = 0;

function showScreen(screenId) {
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    screens[screenId].classList.remove('hidden');
}

// THE SMART MOBILE FIX
function playVideo() {
    showScreen('video-screen');
    
    let playPromise = introVideo.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {
            // Success! The video is playing. Keep the button hidden until the end.
            document.getElementById('btn-next-video').classList.add('hidden');
        }).catch(error => {
            // Blocked! The browser stopped the video. Show the button so she isn't stuck.
            console.log("Mobile blocked auto-play.", error);
            document.getElementById('btn-next-video').classList.remove('hidden');
        });
    }
}

// This makes the button appear exactly when the video finishes
introVideo.onended = () => {
    document.getElementById('btn-next-video').classList.remove('hidden');
};

function showMusic() {
    showScreen('music-screen');
}

function startGame() {
    let playPromise = bgMusic.play();
    if (playPromise !== undefined) {
        playPromise.catch(error => console.log("Audio blocked by browser.", error));
    }
    loadQuestion();
}

const story = [
    {
        title: "Chapter 1: The Mirror 🌸",
        desc: "Sometimes, your brain plays tricks on you. It whispers that you aren't good enough, or that nobody cares about you. But those are just lies made up by overthinking. The truth is, you are incredibly special, and there are people who care about you deeply (including me!).",
        text: "When your brain tells you that no one is there for you, what should you do?",
        funny: false,
        choices: [
            { text: "Believe it and feel alone 😔", mainPath: false, reaction: "That is the overthinking talking! You are never alone. Even when it feels dark, I am right here cheering for you.", subQ: "Will you try to remember that?", subChoices: ["I'll try ❤️", "Okay"] },
            { text: "Compare myself to others", mainPath: false, reaction: "Comparison is a thief! People only show their best on the outside. You have a beautiful heart, and you are loved exactly as you are.", subQ: "Promise me you'll stop comparing?", subChoices: ["I promise", "I'll try my best"] },
            { text: "Remember that I am loved 😊", mainPath: true, reaction: "That is exactly right. You are loved, you are enough, and you are never alone." }
        ]
    },
    {
        title: "Chapter 2: The Unspoken Love 🕊️",
        desc: "Being the youngest in the family can feel so heavy sometimes, like no one understands you. But look around. Some people in this world don't even have a family to keep them safe. Your family might not say it perfectly, but they provide for you, protect you, and love you.",
        text: "When family drama makes you feel unloved, what is the truth?",
        funny: false,
        choices: [
            { text: "They don't care about me at all", mainPath: false, reaction: "That's not true. They might be annoying or bad at showing it, but they gave you everything you needed to grow up safe.", subQ: "Can we try to see their messy love?", subChoices: ["It's hard, but I'll try", "Okay"] },
            { text: "I'm just a burden to them", mainPath: false, reaction: "Never! They wouldn't have raised you and given you so much if you were a burden. You are their youngest, their little blessing.", subQ: "Do you believe me?", subChoices: ["I'll try to see it", "Okay ❤️"] },
            { text: "They love me, even if it's complicated", mainPath: true, reaction: "Exactly. Family is messy and drama happens, but their love for you is very real." }
        ]
    },
    {
        title: "Chapter 3: The Reset 🔄",
        desc: "Sometimes people from far away (like, really far away... maybe across an ocean 🦘) or outside stress can make you feel sad. But your worth isn't decided by anyone else. You are entering the most important time of your life with these A/L exams.",
        text: "So, who is the main character of your story?",
        funny: false,
        choices: [
            { text: "The people causing me stress", mainPath: false, reaction: "Absolutely not! We are not giving them the main stage! This is YOUR life.", subQ: "Are you ready to take back control?", subChoices: ["Yes!", "Let's do it"] },
            { text: "My overthinking brain", mainPath: false, reaction: "Nope! Your brain is just a side character making too much noise. Time to mute it!", subQ: "Ready to mute the noise?", subChoices: ["Mute it!", "I'm ready"] },
            { text: "ME. The Wonder Woman of Polonnaruwa.", mainPath: true, reaction: "BINGO! The legend awakens. It is time for chaos! 😎🔥" }
        ]
    },
    {
        title: "Chapter 4: The Distraction 📱",
        desc: "",
        text: "You sit down to study. Suddenly, your phone buzzes! What is the move?",
        funny: true,
        choices: [
            { text: "Scroll TikTok for '5 mins'", mainPath: false, reaction: "ALERT: '5 minutes' is actually 3 hours in Kota Time! Put it down! 😂", subQ: "How do you escape the phone?", subChoices: ["Throw it away", "Give it to me"] },
            { text: "Text that guy in Australia 🦘", mainPath: false, reaction: "ALERT: He is probably asleep anyway because of time zones! A/Levels are more important right now! 😂", subQ: "Back to the books?", subChoices: ["Fine 🙄", "Okay okay"] },
            { text: "Put it on silent", mainPath: true, reaction: "Maximum focus achieved! +500 IQ! You are a genius! 🧠⚡" }
        ]
    },
    {
        title: "Chapter 5: The Drama 📢",
        desc: "",
        text: "You start reading your notes, but suddenly... drama happens! Someone is shouting!",
        funny: true,
        choices: [
            { text: "Run away fast!", mainPath: false, reaction: "ESCAPE FAILED! You tried to run, but your legs are too short! You only moved 2 inches! 😂", subQ: "What's the backup plan?", subChoices: ["Hide under the desk", "Pretend to sleep"] },
            { text: "Panic and Wheeze", mainPath: false, reaction: "OXYGEN LEVEL DROPPING! *Aggressively Deploys Emergency Inhaler* 💨 BOOM! +100 Health! You survive!", subQ: "Are you breathing normal now?", subChoices: ["Inhale, Exhale 😌", "Yes I'm good!"] },
            { text: "Ignore them like a boss", mainPath: true, reaction: "Ice cold. Polonnaruwa Kota does not care! +100 Gangster Points! 😎👑" }
        ]
    },
    {
        title: "Chapter 6: THE FINAL BOSS 👿",
        desc: "",
        text: "THE FINAL BOSS APPEARS: THE A/L EXAM. It says: 'You only have a few days left! You will fail!'",
        funny: true,
        choices: [
            { text: "Cry about it", mainPath: false, reaction: "Panic mode blocked! You are the Wonder Woman of Polonnaruwa! You don't cry, you destroy!", subQ: "How will you attack?", subChoices: ["Study harder 📚", "Use a pencil ✏️"] },
            { text: "Give up", mainPath: false, reaction: "GIVE UP? Polonnaruwa Kota never gives up! Her problems give up!", subQ: "Ready to destroy it?", subChoices: ["Always!", "Let's go"] },
            { text: "Take a deep breath and trust myself 💖", mainPath: true, reaction: "THE ULTIMATE SUPERPOWER! ✨ The exam is terrified of your confidence! You are completely ready for this. BOOM! 💥" }
        ]
    }
];

function loadQuestion() {
    if (currentStage >= story.length) {
        showScreen('finale-screen');
        return;
    }

    const q = story[currentStage];
    document.getElementById('q-title').innerText = q.title;
    document.getElementById('q-desc').innerText = q.desc;
    document.getElementById('q-text').innerText = q.text;
    
    if (q.funny) {
        document.body.classList.add('funny-mode');
        document.getElementById('q-title').style.color = "#fb8500";
        document.getElementById('reaction-screen').style.borderColor = "#fb8500";
        document.getElementById('reaction-title').style.color = "#fb8500";
    } else {
        document.body.classList.remove('funny-mode');
        document.getElementById('q-title').style.color = "#ff4d6d";
        document.getElementById('reaction-screen').style.borderColor = "#ff4d6d";
        document.getElementById('reaction-title').style.color = "#ff4d6d";
    }

    const btnContainer = document.getElementById('btn-container');
    btnContainer.innerHTML = '';

    q.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = choice.text;
        if(q.funny) btn.classList.add('btn-funny');
        
        btn.onclick = () => {
            showReaction(choice, q.funny);
        };
        btnContainer.appendChild(btn);
    });

    showScreen('game-screen');
}

function showReaction(choice, isFunny) {
    document.getElementById('reaction-text').innerText = choice.reaction;
    const subQText = document.getElementById('sub-q-text');
    const subBtnContainer = document.getElementById('sub-btn-container');
    subBtnContainer.innerHTML = '';

    if (choice.mainPath) {
        document.getElementById('reaction-title').innerText = "YES! 🎉";
        subQText.innerText = choice.reaction;
        
        const btn = document.createElement('button');
        btn.innerText = "Keep going! 🏃‍♀️";
        btn.classList.add('btn-correct');
        btn.onclick = () => {
            currentStage++; 
            loadQuestion();
        };
        subBtnContainer.appendChild(btn);

    } else {
        document.getElementById('reaction-title').innerText = "Wait a second... 🛑";
        subQText.innerText = choice.subQ;

        choice.subChoices.forEach(choiceText => {
            const btn = document.createElement('button');
            btn.innerText = choiceText;
            if(isFunny) btn.classList.add('btn-funny');
            
            btn.onclick = () => {
                loadQuestion(); 
            };
            subBtnContainer.appendChild(btn);
        });
    }

    showScreen('reaction-screen');
}

function showHug(answer) {
    const gif = document.getElementById('hug-gif');
    const title = document.getElementById('hug-title');
    const text = document.getElementById('hug-text');

    if (answer === 'yes') {
        gif.src = 'hu1.gif';
        title.innerText = 'Yay! ✨';
        text.innerText = 'This hug is for you. Now go and do your work! 📚❤️';
    } else {
        gif.src = 'hu2.gif';
        title.innerText = 'Come here... 💙';
        text.innerText = 'A long, tight hug for you. Take your time, breathe, and get back to it when you are ready. 🫂';
    }

    document.body.classList.remove('funny-mode');
    showScreen('hug-screen');
}