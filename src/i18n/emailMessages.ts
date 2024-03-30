export enum EmailType {
    AUTH_SIGN_IN= 'authSignIn',
}
export const emailMessages = {
    cs: {
        [EmailType.AUTH_SIGN_IN]: {
            header: 'Potvrďte prosím email',
            text: 'Email potvrdíte kliknutím na tlačítko "Potvrdit email"',
            confirm: 'Potvrdit email',
        }
    }
}