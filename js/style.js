const FACES = [
    { id: 1, value: './img/1.png' },
    { id: 2, value: './img/2.png' },
    { id: 3, value: './img/3.png' },
    { id: 4, value: './img/4.png' },
    { id: 5, value: './img/5.png' },
    { id: 6, value: './img/6.png' }
]

//this function is used to change dice's face by give .dice_image new img link
let i = 0;
const chageFaces = () => {
    let currentFace = document.querySelector('#diceFace');
    currentFace.src = FACES[i].value;
    currentFace.dataset.id = FACES[i].id;
    if (i === FACES.length - 1) {
        i = 0;
    } else i++;
};
//change dice's face every 100mls
let interval = setInterval(chageFaces, 100);

//this function is used to stop changing dice's face
const stopChangingFace = () => {
    setTimeout(event => {
        clearInterval(interval); //to stop changing dice's face
    }, 1000)
};

// *****
// let point = 4
// function updatePoint(pointCurrent) {
//     pointCurrent = 10
// }
// *****

// this function to compare choosen number vs dice number: 1: win; 0: almost; -1: lost
const compareDice = (userNum, diceNum) => {
    let diceId = FACES.findIndex(face => face.id == diceNum) + 1;
    let check = Math.abs(userNum - diceId);
    if (check == 0) {
        return 1;
    }
    if (check > 3) {
        return -1;
    } else return 0;
}

// //dùng hàm
// pointCurrent = 2;
// updatePoint(point)
//     // pointCurrent = point
//     // pointCurrent = 10
// console.log(point);

//this function is used to listen click event of user on #stopDiceBtn
const stopBtn = document.querySelector('#stopDiceBtn');
stopBtn.addEventListener("click", event => {
    //waiting
    let notifySide = document.querySelector(".notifySide");
    let waitingText = document.createElement("h6");
    waitingText.textContent = "waiting...";
    notifySide.appendChild(waitingText);

    //compare
    stopChangingFace();
    setTimeout(event => {
        let userNum = document.querySelector("#userNum").value;
        let diceNum = document.querySelector("#diceFace").getAttribute('data-id');
        if (compareDice(userNum, diceNum) == 1) {
            notifySide.innerHTML = "<h3 class='p-3' style='background-color: #ECFBF3; color: #3DDA84' id='win-noti'>Yay! You choose right!</h3>";
        } else
            if (compareDice(userNum, diceNum) == 0) {
                notifySide.innerHTML = "<h3 class='p-3' style='background-color: #D7EFFE; color: #4383F3' id='win-noti'>Almost win. One more time!</h3>";
            } else {
                notifySide.innerHTML = "<h3 class='p-3' style='background-color: #e1e4e7;' id='win-noti'>Ohh! Other time...</h3>";
            }
        document.querySelector('#stopDiceBtn').classList.add('d-none');
        document.querySelector('#playAgainBtn').classList.remove('d-none');
    }, 1000);
});

//this function to replay
document.querySelector('#playAgainBtn').addEventListener("click", event => {
    document.querySelector('.notifySide').innerHTML = "";
    document.querySelector('#stopDiceBtn').classList.remove('d-none');
    document.querySelector('#playAgainBtn').classList.add('d-none');
    interval = setInterval(chageFaces, 100);
});

