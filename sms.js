const readline = require('readline');
const twilio = require('twilio');

// Remplacez ces valeurs par celles de votre compte Twilio
const accountSid = 'ACc91553f2598893ffe315d5bdcb228e7e';
const authToken = '40394b23c1d131b68d9268db6eda75df';
const twilioNumber = '+14708354690  ';

// Créez une interface pour lire l'entrée de l'utilisateur
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});

// Fonction pour envoyer un SMS de vérification
function sendVerificationSMS(phoneNumber) {
const client = twilio(accountSid, authToken);

// Générez un code de vérification à 6 chiffres (vous pouvez utiliser un autre mécanisme de génération de code si vous le souhaitez)
const verificationCode = Math.floor(100000 + Math.random() * 900000);

client.messages
    .create({
    body: `Bienvenue sur DJOBY. Votre code de vérification est : ${verificationCode}`,
    from: twilioNumber,
    to: phoneNumber
    })
    .then((message) => {
    console.log(`SMS envoyé avec succès. SID du message : ${message.sid}`);
    // Demander à l'utilisateur de saisir le code de vérification
    rl.question('Veuillez saisir le code de vérification reçu par SMS : ', (userVerificationCode) => {
        // Vérifier si le code entré par l'utilisateur correspond au code de vérification généré précédemment
        if (userVerificationCode === verificationCode.toString()) {
        console.log('Le code de vérification est correct. Validation réussie !');
        rl.close();
        } else {
        console.log('Le code de vérification est incorrect. Validation échouée !');
        rl.close();
        }
    });
    })
    .catch((error) => {
    console.error('Une erreur s\'est produite lors de l\'envoi du SMS :', error);
    rl.close();
    });
}

// Demander à l'utilisateur de saisir le numéro de téléphone
rl.question('Veuillez saisir le numéro de téléphone du destinataire : ', (phoneNumber) => {
// Appelez la fonction avec le numéro de téléphone saisi par l'utilisateur
sendVerificationSMS(phoneNumber);
});