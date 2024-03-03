import fs from "fs";

fs.mkdirSync("./docs/assets", { recursive: true });
fs.cp("./src/assets/", "./docs/assets/", { recursive: true }, (err) => {
	if (err) {
		console.error(err);
	}
});
