//Différentes initialisations avant le début du programme
var selected = {"ACDA":true,	//Matières séléctionnées
"ANG":true,
"APL":true,
"ART":true,
"ASR":true,
"EC":true,
"EGOD":true,
"MAT":true,
"SGBD":true,
"SPORT":true};
var useAll = document.getElementById('all').checked;	//Faut-il utiliser tous les étudiants ou uniquement ceux de la promotion
var students = new Array();	//Liste des noms des étudiants
var scores = new Array();	//Score des étudiant (scores[nomEtudiant] = "score étudiant")
var studentsOutCount = new Array();	//Liste des personnes votées par x
																	//(studentsOutCount[nomEtudiant][matière] = "liste des personnes votées par l'étudiant dans la matière consernée")
var studentsInList = new Array();	//Nombre de personnes ayant voté pour x
																	//(studentsInList[nomEtudiant][matière] = "#personnes ayant voté pour l'étudiant dans la matière consernée")
var p = 0.85;				//Probabilité
var rankingLoop = 25;	//Précision des résultats

function init(){ //Fonction générale d'initialisation

		initStudents();
    initIn();
    initOut();
    initCheckboxValues();
    initPage();
}

function initStudents(){	//Initialisation de la liste des noms des étudiants
  var i;
  var j;
  var k;
	students = new Array();

	//Ajout de tous les noms que l'on peut trouver
	if(useAll){	//Si on prend tous les étudiant
		for (i in votes){	//Pour chaque personne ayant voté
	        if (students.indexOf(i) === -1){	//Ajout dans la liste si elle n'y est pas
	            students.push(i);
	        }
	        for (j in votes[i]){	//Pour chaques matières
	            for (k in votes[i][j]){	//Pour chaque personne ayant été voté
	                if (students.indexOf(votes[i][j][k]) === -1){	//Ajout dans la liste si elle n'y est pas
	                    students.push(votes[i][j][k]);
	                }
	            }
	        }
	    }
		}

    for (i in logins){	//Pour chaque personne de la promotion
        if (students.indexOf(i) === -1){	//Ajout dans la liste si elle n'y est pas
            students.push(i);
        }
    }

    students.sort();	//Tri par ordre alpabétique
}

function initScores(){	//Initialisation des scores
	var i;

  for(i in students){	//Pour chaque étudiant
    if(scores.indexOf(students[i]) === -1){	//Ajout dans la liste des scores s'il n'y est pas
      scores.push(students[i]);
    }
    scores[students[i]] = (1 - p) / students.length;	//Initialisation d'un score de base
  }
}

function initIn(){	//Initialisation du nombre de personnes ayant voté pour x
	var i;
	var j;
	var k;

  for(i in students){	//Pour chaque étudiant
  	if(studentsInList.indexOf(students[i]) === -1){	//Ajout dans la liste s'il n'y est pas
	    studentsInList.push(students[i]);
		}
		studentsInList[students[i]] = new Array();

  	for(j in selected){	//Pour chaques matières
	    if(studentsInList[students[i]].indexOf(j) === -1){	//Ajout dans la liste à l'index de l'étudiant s'il n'y est pas
		    studentsInList[students[i]].push(j);
			}
			studentsInList[students[i]][j] = new Array();

			for(k in votes){	//Pour chaque personne ayant voté
				//Si on utilise que les étudiants de la promotion et que l'étudiant actuel est bien dans la promotion,
				//ou q'on prend tout le monde
				if((!useAll && students.indexOf(k) !== -1) || useAll){
					if(votes[k][j].indexOf(students[i]) >= 0){	//Si elle à voté pour l'étudiant dans la matière consernée
						studentsInList[students[i]][j].push(k);	//Ajout dans la liste à l'index de la matière
					}
				}
			}
		}
  }
}

function initOut(){ //Initialisation de la liste des personnes votées par x
	var i;
	var j;

  for(i in students){	//Pour chaque étudiant
    if(studentsOutCount.indexOf(students[i]) === -1){	//Ajout dans la liste s'il n'y est pas
      studentsOutCount.push(students[i]);
    }
    studentsOutCount[students[i]] = new Array();

    for(j in selected){	//Pour chaques matières
	    if(studentsOutCount[students[i]].indexOf(j) === -1){	//Ajout dans la liste à l'index de l'étudiant s'il n'y est pas
		    studentsOutCount[students[i]].push(j);
			}

			if(votes[students[i]] === undefined){	//Si l'étudiant n'a pas voté
				studentsOutCount[students[i]][j] = 0;
			}else{ //Sinon, on récupère le total de personnes pour lesquelles l'étudiant à voté
				studentsOutCount[students[i]][j] = votes[students[i]][j].length;
			}
		}
  }
}

function initCheckboxValues(){	//Initialisation des valeurs des cases à cocher
	var i;

	for(i in selected){	//Pour chaque matière
    	selected[i] = document.getElementById(i).checked;	//On définie s'il elle est cochée ou non
    }
}

function initPage(){	//Initialisation des éléments de la page
		var i;
		var row;
    var rank;
    var name;
    var score;
    var tbody = document.getElementById('tbody');
    var select = document.getElementById('select');

		//Remise à 0 des listes
		tbody.innerHTML = "";
		select.innerHTML = "";
		select.innerHTML += "<option>Rechercher</option>";

    for(i in students){	//Pour chaque étudiant
			//Ajout de chaque étudiant dans la liste déroulante
      select.innerHTML += "<option id=\"" + students[i] + "\" data-rank=\"\" onClick=\"goTo(this);\">" +
                              students[i] +
                          "</option>";

			//Création des lignes du tableau
      row = document.createElement('tr');
      rank = document.createElement('td');
      name = document.createElement('td');
      score = document.createElement('td');

      rank.id = "rank_" + i;
      name.id = "name_" + i;
      score.id = "score_" + i;

      rank.innerHTML = parseInt(i) + 1;

      rank.classList.add("col");
      name.classList.add("col");
      score.classList.add("col");

      row.appendChild(rank);
      row.appendChild(name);
      row.appendChild(score);
      tbody.appendChild(row);
    }
}
