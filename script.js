// sélectionner les éléments html 
let container = document.querySelector('.container');
let btn = document.querySelector('.start_btn');
let scoreContainer = document.querySelector('.score');
let timeContainer = document.querySelector('.time');

let interval; // variable globale pour éviter les doublons

btn.onclick = function () {
    clearInterval(interval); // on arrête une ancienne partie si elle tourne encore

    let score = 0;
    let time = 10;
    container.innerHTML = "";

    // affichage initial
    scoreContainer.innerHTML = `Score : ${score}`;
    timeContainer.innerHTML = `Temps : ${time}`;

    interval = setInterval(function showTarget() {
        // création de la cible 
        let target = document.createElement('img');
        target.id = "target";
        target.src = "silly.png";
        container.appendChild(target);

        // positionner la cible aléatoirement dans le conteneur
        target.style.top = Math.random() * (container.clientHeight - target.offsetHeight) + 'px';
        target.style.left = Math.random() * (container.clientWidth - target.offsetWidth) + 'px';

        // faire disparaître la cible après 2 secondes
        setTimeout(function () {
            if (container.contains(target)) {
                target.remove();
            }
        }, 2000);

        // quand on clique sur la cible
        target.onclick = function () {
            score += 1;
            scoreContainer.innerHTML = `Score : ${score}`; // mise à jour immédiate du score
            target.remove();
        };

        // décrémenter le temps à chaque seconde
        time -= 1;
        timeContainer.innerHTML = `Temps : ${time}`;

        // fin du jeu quand le temps est écoulé 
        if (time <= 0) {
            clearInterval(interval);
            container.innerHTML = "<p style='text-align:center;'>🎉 Le jeu est terminé 🎉<br>Score final : " + score + "</p>";
        }

    }, 1000);
};
