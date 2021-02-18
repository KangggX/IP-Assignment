var allUserPoints = [];
var allUser = [];
generateList();

function getPoints() {
    return new Promise((resolve, reject) => {
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                allUserPoints.push(doc.data().globalPoints);
            });
        });

        setTimeout(() => {
            allUserPoints.sort(function (a, b) { return b - a });
            resolve(allUserPoints);
        }, 600);
    });
};

async function getUser() {
    const points = await getPoints();

    return new Promise((resolve, reject) => {
        for (let i = 0; i < points.length; i++) {
            db.collection("users").where("globalPoints", "==", points[i]).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    allUser.push(doc.data().name);
                });
            });
        }

        setTimeout(() => {
            resolve(allUser);
        }, 600);
    });
}

async function generateList() {
    let output = [];
    const users = await getUser();

    for (let i = 0; i < users.length; i++) {
        
        if (allUser[i] == localStorage["username"]) {
            output.push(`
                <li>
                    <div class="leaderboard__list--item leaderboard--ranking"><span>${i + 1}</span></div>
                    <div class="leaderboard__list--item leaderboard--points">${allUserPoints[i]}</div>
                    <div class="leaderboard__list--item leaderboard--user" style="color: #0084F5;">${allUser[i]}</div>
                </li>
            `)
        } else {
            output.push(`
                <li>
                    <div class="leaderboard__list--item leaderboard--ranking"><span>${i + 1}</span></div>
                    <div class="leaderboard__list--item leaderboard--points">${allUserPoints[i]}</div>
                    <div class="leaderboard__list--item leaderboard--user">${allUser[i]}</div>
                </li>
            `)
        }
    }

    $("#leaderboard--content").html(`
        <ul class="leaderboard__list">
            <li style="margin-bottom: 5px;">
                <div class="leaderboard__list--item leaderboard__title--ranking">RANKING</div>
                <div class="leaderboard__list--item leaderboard__title--points">POINTS</div>
                <div class="leaderboard__list--item leaderboard__title--user">PLAYER</div>
            </li>
            ${output.join('')}
        </ul>
    `);
}
