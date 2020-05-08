//Gère les intéractions dans la page

function inverseChecked(checkbox) { //Lorsqu'une case à cocher à été sélectionnée ou désélectionnée
  selected[checkbox.value] = !selected[checkbox.value]; //Inversion de sa valeur
  document.getElementById('ALL').checked = false;
  setRanking(); //Mise à jour du classement
}

function checkAll(checkbox) { //Lorsque case à cocher "toutes" est sélectionnée ou désélectionnée
  var i;

  if(checkbox.checked){ //Si elle vient d'être sélectionnée
    for(i in selected){ //Pour touts les autres checkbox
      //Elle est sélectionnée
      document.getElementById(i).checked = true;  
      selected[i] = true; 
    }
  }

  setRanking(); //Mise à jour du classement
}

function useAllStudents(doUseAll) { //Determiner si on utilise tous les étudiants ou ceux de la promotion seulement
  useAll = doUseAll;  //true ou false
  init(); //Nouvelle initialisation car la liste des étudiants n'est' pas la même
  setRanking(); //Classement
}

function goTo(option){  //Lorsqu'un étudiant est choisi dans la liste déroulante
  window.location.href = "#rank_" + option.dataset.rank;  //Déplacement jusqu'à la ligne où l'étudiant se situe
}

function tabBugFix(){ //Règle le problème d'accès aux objets logins et votes, bloqués par le naviguateur
  window.location.href = "http://dwarves.iut-fbleau.fr/~dozl/Math_rank/";
}

function refresh(){ //Rafraichi la page
  document.location.reload(true);
}

function showRanking(){ //Affiche le classement
  var i;
  var sort = students.slice(0);
  var nameMax;  //Etudiant ayant le meilleur score
  var rankPos;

  while(sort.length > 0){ //Tant qu'il reste un étudiant à classer
    nameMax = "";

    for(i in sort){ //Pour chaque étudiant à classer
      //Si aucun étudiant n'est séléctionné ou si son score est encore meilleur
      if(nameMax === "" || scores[sort[i]] > scores[nameMax]){
        nameMax = sort[i];  //Il est séléctionner comme l'étudiant ayant le meilleur score
      }
    }
    rankPos = students.length - sort.length;  //Son rang est défini
    sort.splice(sort.indexOf(nameMax),1); //On le retire des étudiants à classer

    //On rentre les données le concernant dans la ligne correspondant à son rang
    document.getElementById(nameMax).dataset.rank = rankPos;
    document.getElementById("name_" + rankPos).innerHTML = nameMax;
    document.getElementById("score_" + rankPos).innerHTML = scores[nameMax];
  }
}
