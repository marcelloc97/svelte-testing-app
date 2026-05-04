import { e as getLocale } from './runtime-DVZBPa9d.js';

//#region src/lib/paraglide/messages/hello_world.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{ name: NonNullable<unknown> }} Hello_WorldInputs */
var en_hello_world = (i) => {
	return `Hello, ${i?.name} from en!`;
};
var es_hello_world = (i) => {
	return `Hola, ${i?.name} de es!`;
};
var pt_br_hello_world = (i) => {
	return `Olá, ${i?.name} de pt-br!`;
};
/**
* | output |
* | --- |
* | "Hello, {name} from en!" |
*
* @param {Hello_WorldInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var hello_world = ((inputs, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_hello_world(inputs);
	if (locale === "es") return es_hello_world(inputs);
	return pt_br_hello_world(inputs);
});
//#endregion
//#region src/lib/paraglide/messages/home_page_intro_p.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Page_Intro_PInputs */
var en_home_page_intro_p = () => {
	return `Game development, media creation with heart and love.`;
};
var es_home_page_intro_p = () => {
	return `Desarrollo de videojuegos, creación de contenido multimedia con pasión y amor.`;
};
var pt_br_home_page_intro_p = () => {
	return `Desenvolvimento de jogos, criação de mídia com coração e amor.`;
};
/**
* | output |
* | --- |
* | "Game development, media creation with heart and love." |
*
* @param {Home_Page_Intro_PInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var home_page_intro_p = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_home_page_intro_p();
	if (locale === "es") return es_home_page_intro_p();
	return pt_br_home_page_intro_p();
});
//#endregion
//#region src/lib/paraglide/messages/home_page_section_team_title.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Page_Section_Team_TitleInputs */
var en_home_page_section_team_title = () => {
	return `Our team`;
};
var es_home_page_section_team_title = () => {
	return `Nuestro equipo`;
};
var pt_br_home_page_section_team_title = () => {
	return `Nosso time`;
};
/**
* | output |
* | --- |
* | "Our team" |
*
* @param {Home_Page_Section_Team_TitleInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var home_page_section_team_title = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_home_page_section_team_title();
	if (locale === "es") return es_home_page_section_team_title();
	return pt_br_home_page_section_team_title();
});
//#endregion
//#region src/lib/paraglide/messages/home_page_team_p.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Page_Team_PInputs */
var en_home_page_team_p = () => {
	return `Our team is full of talent people that love games and media in general. Here we realize of various creators dreams who want to take of the paper your ideas. Exited to do the same?`;
};
var es_home_page_team_p = () => {
	return `Nuestro equipo está formado por personas con mucho talento a las que les apasionan los videojuegos y los medios de comunicación en general. Aquí hacemos realidad los sueños de creadores que quieren plasmar sus ideas en papel. ¿Te animas a hacer lo mismo?`;
};
var pt_br_home_page_team_p = () => {
	return `Nosso time é repleto de pessoas talentosas que amam jogos e mídias no geral. Aqui realizamos sonhos de vários criadores que querem tirar do papel todas suas ideias. Animado para fazer o mesmo?`;
};
/**
* | output |
* | --- |
* | "Our team is full of talent people that love games and media in general. Here we realize of various creators dreams who want to take of the paper your ideas. ..." |
*
* @param {Home_Page_Team_PInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var home_page_team_p = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_home_page_team_p();
	if (locale === "es") return es_home_page_team_p();
	return pt_br_home_page_team_p();
});
//#endregion
//#region src/lib/paraglide/messages/home_page_calling_p.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Home_Page_Calling_PInputs */
var en_home_page_calling_p = () => {
	return `Come join our team and let's make your dream come true!`;
};
var es_home_page_calling_p = () => {
	return `¡Únete a nuestro equipo y hagamos realidad tu sueño!`;
};
var pt_br_home_page_calling_p = () => {
	return `Venha se juntar ao nosso time e vamos tornar seus sonhos uma realidade!`;
};
/**
* | output |
* | --- |
* | "Come join our team and let's make your dream come true!" |
*
* @param {Home_Page_Calling_PInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var home_page_calling_p = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_home_page_calling_p();
	if (locale === "es") return es_home_page_calling_p();
	return pt_br_home_page_calling_p();
});
//#endregion
//#region src/lib/paraglide/messages/common_about_page.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_About_PageInputs */
var en_common_about_page = () => {
	return `About us`;
};
var es_common_about_page = () => {
	return `Sobre nosotros`;
};
var pt_br_common_about_page = () => {
	return `Sobre nós`;
};
/**
* | output |
* | --- |
* | "About us" |
*
* @param {Common_About_PageInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var common_about_page = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_common_about_page();
	if (locale === "es") return es_common_about_page();
	return pt_br_common_about_page();
});
//#endregion
//#region src/lib/paraglide/messages/common_contact_page.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_Contact_PageInputs */
var en_common_contact_page = () => {
	return `Contact us`;
};
var es_common_contact_page = () => {
	return `Contacta con nosotros`;
};
var pt_br_common_contact_page = () => {
	return `Contato`;
};
/**
* | output |
* | --- |
* | "Contact us" |
*
* @param {Common_Contact_PageInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var common_contact_page = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_common_contact_page();
	if (locale === "es") return es_common_contact_page();
	return pt_br_common_contact_page();
});
//#endregion
//#region src/lib/paraglide/messages/common_join_us.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_Join_UsInputs */
var en_common_join_us = () => {
	return `Join us`;
};
var es_common_join_us = () => {
	return `Únete a nosotros`;
};
var pt_br_common_join_us = () => {
	return `Junte-se a nós`;
};
/**
* | output |
* | --- |
* | "Join us" |
*
* @param {Common_Join_UsInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var common_join_us = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_common_join_us();
	if (locale === "es") return es_common_join_us();
	return pt_br_common_join_us();
});
//#endregion
//#region src/lib/paraglide/messages/common_team.js
/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Common_TeamInputs */
var en_common_team = () => {
	return `Team`;
};
var es_common_team = () => {
	return `Equipo`;
};
var pt_br_common_team = () => {
	return `Time`;
};
/**
* | output |
* | --- |
* | "Team" |
*
* @param {Common_TeamInputs} inputs
* @param {{ locale?: "en" | "es" | "pt-br" }} options
* @returns {LocalizedString}
*/
var common_team = ((inputs = {}, options = {}) => {
	const locale = options.locale ?? getLocale();
	if (locale === "en") return en_common_team();
	if (locale === "es") return es_common_team();
	return pt_br_common_team();
});

export { common_team as a, common_contact_page as b, common_about_page as c, home_page_section_team_title as d, home_page_team_p as e, home_page_calling_p as f, common_join_us as g, home_page_intro_p as h, hello_world as i };
//# sourceMappingURL=messages-CQ-WFi1H.js.map
