angular.module('todoApp', [])
.controller('ChatController', function($scope) {
  /**
   * Boolean permettant de vérifier si l'utilisateur a demandé qu'on lui parle de l'actualité
   * @type {Boolean}
   */
   $scope.isActuality = false;

  /**
   * Boolean permet de vérifier si l'utilisateur a déjà dis bonjour
   * @type {Boolean}
   */
   $scope.isBonjour = false;

  /**
   * Boolean permet de vérifier si l'utilisateur a déjà dis bonjour
   * @type {Boolean}
   */
   $scope.showActu = false;

  /**
   * [showCommand description]
   * @type {Boolean}
   */
   $scope.showCommand = false;

   $scope.isCant = false

   $scope.isMan = null;

   $scope.showAccount = false;

   $scope.user = {
    name:null,
    sexe:null
  };

  $scope.messages=[];
  $scope.liens = [
  {cle: "informatique",lienMagazine:"https://www.lemondeinformatique.fr/"},  
  {cle: "cheval",lienMagazine:"http://www.chevalmag.com"},
  {cle: "bricolage",lienMagazine:"https://www.systemed.fr/"},
  {cle: "numérique",lienMagazine:"https://www.focus-numerique.com/"},
  {cle: "voyages",lienMagazine:"http://www.geo.fr/"},
  {cle: "économie",lienMagazine:"https://www.latribune.fr/"},
  {cle: "éco",lienMagazine:"https://www.latribune.fr/"},
  {cle: "finance",lienMagazine:"https://www.latribune.fr/"},
  {cle: "international",lienMagazine:"http://www.lejournalinternational.info/"},
  {cle: "société",lienMagazine:"https://www.society-magazine.fr/index.php"},
  {cle: "culture",lienMagazine:"https://www.franceculture.fr/emissions/le-journal-de-la-culture-1"},
  {cle: "science",lienMagazine:"https://www.futura-sciences.com/"},
  {cle: "sport",lienMagazine:"https://www.lequipe.fr/"},
  {cle: "jeunesse",lienMagazine:"http://impactcampus.ca/"},
  ];

  $scope.commandes = [
  {nom: "Bonjour", reaction:"Il vous répondras bonjour"},
  {nom: "Si vous lui dite une autre fois bonjour", reaction:"Il vous proposera d'aller consuler un site d'alzeimer"},
  {nom: "Si vous lui dite que vous un êtes un homme", reaction:"Il vous appelera monsieur"},
  {nom: "Si vous lui dite que vous un êtes un femme", reaction:"Il vous appelera madame"},
  {nom: "Si vous lui demander de vous parler de l'actualité", reaction:"Il vous demandera quel thème vous souhaitez"},
  {nom: "Si vous lui demander de lui parler d'un thème de l'actualité", reaction:"Il vous proposera de vous rendre sur un site spécialisé"},
  ];

  $scope.message = {};

  $scope.showActualities = function(){
    $scope.messages = [];
    $scope.messages.push("Les Thèmes : ");
    for (var i = $scope.liens.length - 1; i >= 0; i--) {
      var lien = $scope.liens[i];
      var data =lien.cle +"("+lien.lienMagazine+")";
      $scope.messages.push(data);
    }
    $scope.message = {};
    $scope.showCommand = false;
    $scope.showActu = true;
  }

  $scope.resetMessages = function(){
    $scope.messages = [];
    $scope.isActuality = false;
    $scope.isBonjour = false;
    $scope.showActu = false;
    $scope.showAccount = false;
    $scope.showCommand = false;
  }

  $scope.help = function(){
    $scope.messages = [];
    $scope.messages.push("Les commandes : ");
    for (var i = $scope.commandes.length - 1; i >= 0; i--) {
      var command = $scope.commandes[i];
      var data =command.nom +" : "+command.reaction+".";
      $scope.messages.push(data);
    }
    $scope.message = {};
    $scope.showActu = false;
    $scope.showAccount = false;
    $scope.showCommand = true;
  }

  $scope.accessMyAccount = function(){
    $scope.showActu = false;
    $scope.showCommand = false;
    $scope.showAccount = true;
  }

  $scope.validInformationAccount = function(){
  }

  var checkLiens = function(array, prop) {
    for (var i = 0; i < array.length; i++) {
      var lien = array[i]
      if (prop.includes(lien.cle)) {
        return lien;
      }
    }
    return null;
  }

  var setUserBot = function(){
    $scope.message.user = "bot";
  }

  var setDateMessage = function(){
    var date = new Date();
    $scope.message.date = date.getHours() + ":" + date.getMinutes();
  }

  var insertBotMessage = function(message){
    $scope.message.text = message;
    $scope.message.user = "bot";
    setDateMessage();
    $scope.messages.push($scope.message);
    $scope.message = {};
  }

  var insertUserMessage =  function(){
    $scope.message.user = "user";
    setDateMessage();
    $scope.messages.push($scope.message);
    $scope.message = {};
  }

  $scope.addMessageUser = function() {
    var text = $scope.message.text;
    if (text != null) {
      var lien = checkLiens($scope.liens, text);
      if (lien != null) {
        insertUserMessage();
        $scope.message.user = "bot";
        $scope.message.text = "Voici un site spécialisé du thème "+lien.cle+" : "+lien.lienMagazine+ ".";
        $scope.messages.push($scope.message)
        $scope.message = {};
      } else {
        insertUserMessage();
        text = text.toLowerCase();
        if (text.includes("bonjour") || text.includes("coucou") || text.includes("hello") ) {
          if ($scope.isBonjour) {
            insertBotMessage("Vous m'avez déjà dis bonjour, voulez vous un site qui pourrais aider : http://www.doctissimo.fr/html/dossiers/alzheimer.htm");
          } else {
            insertBotMessage("Bonjour, pourriez vous m'indiquer si vous un homme ou une femme s'il vous plait?");
            $scope.isBonjour = true;
          }
        } else if (text.includes("monsieur") || text.includes("homme")) {
          $scope.isMan = true;
          insertBotMessage("En quoi puisse-je vous aider monsieur?");
        } else if (text.includes("madame") || text.includes("femme")) {
          $scope.isMan = false;
          insertBotMessage("En quoi puisse-je vous aider madame?");
        } else if (text.includes("actualité") || text.includes("nouvelle") || text.includes("actu") || text.includes("actu") || text.includes("nouveauté") || text.includes("évènement")) {
          if (text.includes("thèmes") || text.includes("thème")) {
            insertBotMessage("Pour cela je vous conseille de cliquer sur le bouton 'voir toute l'actualité'.");
          }else {
            if ($scope.isMan != null && $scope.isMan === true) {
              insertBotMessage("Je peux vous proposer différents thèmes concernant l'actualité Monsieur.");
            } else if ($scope.isMan != null && $scope.isMan === false) {
              insertBotMessage("Je peux vous proposer différents thèmes concernant l'actualité Madame.");
            } else {
              insertBotMessage("Je peux vous proposer différents thèmes concernant l'actualité.");
            }
          }
          $scope.isActuality = true;
        } else if (text.includes("ca va")) {
          insertBotMessage("Bonjour, je ne sais pas si je vais bien vu que je suis une machine.");
        } else if (text.includes("merci")) {
          insertBotMessage("De rien.");
        } else if (text.includes("au revoir")) {
          insertBotMessage("Au revoir.");
        } else if (text.includes("peux pas")) {
          insertBotMessage("Pourquoi je ne pourrais pas?");
          $scope.isCant = true
        } else {
          if ($scope.isCant) {
            insertBotMessage("D'accord, je comprends. Puis-je vous conseiller un thème sur l'actualité?");
            $scope.isCant = false;
          } else {
            insertBotMessage("Désolé, je ne comprends ce que vous avez écris.");
          }
        }
      }
      $scope.message = {};
    }
  }

});
