({
  titre: `Transtypage (cast)`,
  consigne: `<p>Ecrivez le code affectant à la variable t la concaténation des variables a et b quelque soient leurs types initiaux</p><p>Ecrivez le code affectant à la variable n l'addition décimale des variables a et b si elles contiennent des nombres ou des valeurs convertibles en nombres</p>`,
  entrees:  ["a", "b"],
  test: `
  eval( code );
  affichage =  "t = " + t + "\\nn = " + n  ;
  `
})