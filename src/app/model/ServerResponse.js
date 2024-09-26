export const ErrorTypes = {
    DEFAULT: 'Une erreur est survenue. Merci de réessayer plus tard.',
    NOUSER: 'Cet utilisateur n\'existe pas, merci de vérifier vos identifiants.',
    SERVER: 'Une erreur est survenue du coté de notre serveur. Nous travaillons actuellement pour résoudre le problème le plus vite possible.',
}

export default class ServerResponse {



    constructor(success, errorType, data) {
        this.success = success;
        this.errorType = errorType;
        this.data = data;
    }
}

