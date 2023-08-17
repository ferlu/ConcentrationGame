const IMAGES_URL =
	"https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20";

export async function fetchImages() {
	return getJSON(IMAGES_URL);
}

async function getJSON(url) {
	const response = await fetch(url);
	return await response.json();
}
