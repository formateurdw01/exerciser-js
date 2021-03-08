const fs = require('fs');
const jsobf = require ('javascript-obfuscator');
let listeExercices = new Object();
let data;

data = fs.readFileSync(process.argv[2], 'utf8');
listeExercices = eval(data);
console.log(listeExercices.titre);

const titrePage = listeExercices.titre;

const nomFichier = listeExercices.fichier;

const exercices = []
const nombreExercices = listeExercices.exercices.length; 

for (let i = 0; i<nombreExercices; i++) {
  let data =  fs.readFileSync(listeExercices.exercices[i], 'utf8');
  exercices.push(eval(data));
}

let entetePage = `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${titrePage}</title>
</head>
<body>
<div class="enveloppe">
  <header class="entete-page">
    <h1  class="entete-page__titre">${titrePage}</h1>
  </header>
`;
let piedPage = `
</div>
</body>
</html>
`;
let contenu = "";

let tests = "";

for (let i = 0; i < exercices.length; i++) {
  contenu += `
  <!-- Exercice ${i} ----------------------------------------------- -->
  <section class="exercice" id="ex-${i}">
    <h2 class="exercice__titre">
      Exercice ${i} - ${exercices[i].titre}
    </h2>
    <div class="exercice__consigne">
      ${exercices[i].consigne}
    </div>
    <pre class="exercice__code-utilisateur" id="ex-${i}-code">
// Votre code javascript ici
    </pre>
`;
  for (let j = 0; j < exercices[i].entrees.length; j++) {
    let nom = exercices[i].entrees[j];
    contenu += `
    <label class="exercice__label-entree">${nom} : <input class="exercice__entree" name="nom" id="ex-${i}-e-${nom}" /></label>`;
  }
  contenu += `
    <input type="button" class="exercice__bouton" value="Test" id="ex-${i}-test" />
    <div class="exercice__affichage" id="ex-${i}-affichage"></div>
  </section>
  
  `;

  tests += `
  document.getElementById("ex-${i}-test").onclick = function() {
    let affichage="";`;

  for (let j = 0; j < exercices[i].entrees.length; j++) {
    let nom = exercices[i].entrees[j];
    tests += `
    let ${exercices[i].entrees[j]} = document.getElementById("ex-${i}-e-${exercices[i].entrees[j]}").value ;`;
  }

  tests += `
    let code = document.getElementById("ex-${i}-code").innerText;
  ${exercices[i].test}
    document.getElementById("ex-${i}-affichage").innerHTML = affichage ;
  } `;
}

let pageComplete = 

entetePage + 
contenu + ` 
  <script>
${jsobf.obfuscate(tests)}
  </script>
` +
`
  <style>
  ${fs.readFileSync("css/styles.css", 'utf8')}
  </style>
`
+
piedPage ;

fs.writeFile(nomFichier + '.html', pageComplete, function (err) {

  if (err) throw err;

  console.log('Fichier créé !');

});

