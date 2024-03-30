import {createI18n} from "vue-i18n";

export async function fetchI18n(i18n) {
    const metaI18nResponse = await fetch('https://delivery.localazy.com/_a7714175476876942646f93ea1e5/_e0.v2.json');
    const { files } = await metaI18nResponse.json();

    // @ts-ignore
    const { locales } = Object.values(files)[0];

    for(let locale of locales) {
        const localeResponse = await fetch(`https://delivery.localazy.com${locale.uri}`);
        const lazyMessages = await localeResponse.json()

        i18n.global.setLocaleMessage(locale.language, {
            ...lazyMessages,
            // @ts-ignore
            ...i18n.global.messages.value[locale.language],
        })
    }
}

export const i18n = createI18n({
    legacy: false,
    locale: 'cs',
    fallbackLocale: 'en',
    messages: {
        cs: {
            'title.base': 'BlueStream AI',
            'title.app': 'Aplikace',
            'title.signIn': 'Přihlášení',
            'title.signUp': 'Registrace',
            'title.emailConfirm': 'Email',
            'title.forgotPassword': 'Zapomenuté heslo',
            'title.intro.welcome': 'Vítejte',
            'title.intro.subscription': 'Předplatné',
            'title.intro.invoice': 'Osobní údaje',
            'title.templates': 'Šablony',
            'title.settings.profile': 'Profil',
            'title.settings.subscription': 'Předplatné',
            'title.settings.tokens': 'Tokeny',
            'title.settings.support': 'Podpora',
            'title.chat': 'Generování',
            'title.cms': 'CMS',
        },
        en: {
            'title.base': 'BlueStream',
            'title.app': 'App',
            'title.signIn': 'Sign In',
            'title.signUp': 'Sign Up',
            'title.emailConfirm': 'Email',
            'title.forgotPassword': 'Forgotten password',
            'title.intro.welcome': 'Welcome',
            'title.intro.subscription': 'Subscription',
            'title.intro.invoice': 'Personal Details',
            'title.templates': 'Templates',
            'title.settings.profile': 'Profile',
            'title.settings.subscription': 'Subscription',
            'title.settings.tokens': 'Tokens',
            'title.settings.support': 'Support',
            'title.chat': 'Content',
            'title.cms': 'CMS',
        }
    },
})
