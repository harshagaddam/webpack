import png from "./file.png";
import svg from "./file.svg";

it("should output default assets", () => {
	expect(png).toEqual("file.png");
	expect(svg).toEqual("file.svg");
})
