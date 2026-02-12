export function generateResearchId(year: number, sequence: number): string {
	const normalizedYear = Number.isFinite(year)
		? Math.trunc(year)
		: new Date().getFullYear();
	const normalizedSequence =
		Number.isFinite(sequence) && sequence > 0 ? Math.trunc(sequence) : 1;
	return `${normalizedYear}-${String(normalizedSequence).padStart(3, "0")}`;
}

const surnameParticles = new Set([
	"al",
	"ap",
	"bin",
	"da",
	"de",
	"de la",
	"de las",
	"de los",
	"del",
	"dela",
	"della",
	"di",
	"dos",
	"du",
	"ibn",
	"la",
	"le",
	"mac",
	"mc",
	"o",
	"st",
	"saint",
	"van",
	"von",
]);

const suffixes = new Set(["jr", "sr", "ii", "iii", "iv", "v"]);

function toTitleCaseWord(word: string): string {
	return word
		.split(/([-'])/g)
		.map((part) => {
			if (part === "-" || part === "'") {
				return part;
			}
			if (!part) {
				return part;
			}
			return `${part[0]?.toUpperCase() ?? ""}${part.slice(1).toLowerCase()}`;
		})
		.join("");
}

function formatFamilyName(rawFamily: string): string {
	const tokens = rawFamily.trim().split(/\s+/).filter(Boolean);
	return tokens
		.map((token, index) => {
			const normalizedToken = token.toLowerCase();
			if (index > 0 && surnameParticles.has(normalizedToken)) {
				return normalizedToken;
			}
			return toTitleCaseWord(token);
		})
		.join(" ");
}

function extractInitials(rawGiven: string): string {
	const tokens = rawGiven.trim().split(/\s+/).filter(Boolean);
	const initials: string[] = [];

	for (const token of tokens) {
		const normalizedToken = token.replace(/[^A-Za-z]/g, "").toLowerCase();
		if (!normalizedToken || suffixes.has(normalizedToken)) {
			continue;
		}

		for (const letter of token.replace(/[^A-Za-z]/g, "")) {
			initials.push(`${letter.toUpperCase()}.`);
			if (token.length > 1) {
				break;
			}
		}
	}

	return initials.join(" ");
}

function splitAuthors(author: string): string[] {
	const semicolonAuthors = author
		.split(";")
		.map((part) => part.trim())
		.filter(Boolean);

	if (semicolonAuthors.length > 1) {
		return semicolonAuthors;
	}

	const commaTokens = author
		.split(",")
		.map((part) => part.trim())
		.filter(Boolean);

	if (commaTokens.length >= 4 && commaTokens.length % 2 === 0) {
		const pairedAuthors: string[] = [];
		for (let index = 0; index < commaTokens.length; index += 2) {
			pairedAuthors.push(
				`${commaTokens[index + 1]} ${commaTokens[index]}`.trim(),
			);
		}
		return pairedAuthors;
	}

	if (commaTokens.length > 1) {
		return commaTokens;
	}

	return [author.trim()].filter(Boolean);
}

function normalizeAuthorForCitation(author: string): string {
	const normalizedAuthor = author.trim();
	if (!normalizedAuthor) {
		return "";
	}

	const parts = normalizedAuthor.split(/\s+/).filter(Boolean);
	if (parts.length === 1) {
		return formatFamilyName(parts[0] ?? "");
	}

	let familyStart = parts.length - 1;
	while (familyStart > 0) {
		const candidate = parts[familyStart - 1]?.toLowerCase() ?? "";
		if (!surnameParticles.has(candidate)) {
			break;
		}
		familyStart -= 1;
	}

	const family = formatFamilyName(parts.slice(familyStart).join(" "));
	const given = parts.slice(0, familyStart).join(" ");
	const initials = extractInitials(given);

	return initials ? `${family}, ${initials}` : family;
}

export function generateApaCitation(
	author: string,
	year: number,
	title: string,
): string {
	const authors = splitAuthors(author)
		.map(normalizeAuthorForCitation)
		.filter(Boolean);
	const normalizedTitle = title.trim().replace(/\.+$/, "");
	const normalizedYear = Number.isFinite(year)
		? Math.trunc(year)
		: new Date().getFullYear();

	if (!authors.length || !normalizedTitle) {
		return "";
	}

	return `${authors.join(", ")} (${normalizedYear}). ${normalizedTitle}.`;
}
