import Part from "./Part";
import { CoursePart } from "../types";



interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
	return (
		<div>
			<Part courseParts={props.courseParts}></Part>
		</div>
	);
};
export default Content;
