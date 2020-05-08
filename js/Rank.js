//Gère le classement

function setRanking(){  //Définie les scores des étudiants
  var i;
  var j;
  var k;
  var l;
  var m;
  var inSum = 0;  //Somme de : (score / #étudiant voté par x), pour chaques étudiants ayant voté pour y
  var outSum = 0;  //#étudiant voté par y
  var currentSubjectListIn; //Liste des matières pour chaque étudiant de studentsInList
  var currentSubjectIn; //matière actuelle pour chaque étudiant de studentsInList
  var currentSubjectListOut; //Liste des matières pour chaque étudiant de studentsOutCount
  var studentsWhoVotedFor;  //Etudiants ayant déjà été compris dans le calcul de inSum
                            //(car on prend en compte que s'il a voté pour telle personne à un moment ou non)

  initScores(); //Nouvelle initialisation des scores

  for(i = 0; i < rankingLoop; i++){ //En fonction de la précision

    for(j in students){ //Pour chaque étudiants
      currentSubjectListIn = studentsInList[students[j]]; //Récupération de la liste des matières pour connaitre les étudiants qui ont voté pour lui
      studentsWhoVotedFor = new Array();

      for(k in currentSubjectListIn){ //Pour chaque matière
        currentSubjectIn = currentSubjectListIn[k]; //Récupération de la matière

      	if(selected[currentSubjectIn]){  //Si la matière est séléctionnée
      		for(l in currentSubjectListIn[currentSubjectIn]){ //pour chaque étudiant dans la matière concernée
      			if(studentsWhoVotedFor.indexOf(currentSubjectListIn[currentSubjectIn][l]) === -1){ //S'il n'a pas déjà été pris en compte dans le calcul
               //Récupération de la liste des matières pour connaitre le nombre de personne pour qui il à voté
		            currentSubjectListOut = studentsOutCount[currentSubjectListIn[currentSubjectIn][l]];

		            for(m in currentSubjectListOut){  //pour chaque matière
		              if(selected[currentSubjectListOut[m]]){  //Si la matière est séléctionnée
		                outSum += currentSubjectListOut[currentSubjectListOut[m]];  //Ajout du #personnes pour qui il a voté dans la matière concernée
		              }
		            }

		      		inSum += scores[currentSubjectListIn[currentSubjectIn][l]] / outSum;
		          outSum = 0;
              //Ajout de l'étudiant qui a voté pour lui dans la liste de ceux déjà pris en coompte dans le calcul
	      			studentsWhoVotedFor.push(currentSubjectListIn[currentSubjectIn][l]);
	      		}
      		}
      	}
    }

      scores[students[j]] = (1 - p) / students.length + p * inSum;  //Calcul du score final de l'étudiant
      inSum = 0;
    }
  }

  showRanking();  //Affichage des scores
}
