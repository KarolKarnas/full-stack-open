import Part from "./Part";
import { CoursePart } from "../types";

// interface CoursePartBase {
//   name: string;
//   exerciseCount: number;
// }

// interface CoursePartBaseDescription extends CoursePartBase {
// 	description: string;
// }

// interface CoursePartBasic extends CoursePartBaseDescription {
//   kind: "basic"
// }

// interface CoursePartGroup extends CoursePartBase {
//   groupProjectCount: number;
//   kind: "group"
// }

// interface CoursePartBackground extends CoursePartBaseDescription {
//   backgroundMaterial: string;
//   kind: "background"
// }

// type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;

interface ContentProps {
	courseParts: CoursePart[];
}

const Content = (props: ContentProps) => {
	return (
		<div>
      {/* {console.log(props.courseParts[0].kind === 'basic' ? `Content ${props.courseParts[0].description}` : null)} */}

			{/* <p>
				<strong>{props.courseParts[0].name} {props.courseParts[0].exerciseCount} {props.courseParts[0].name}</strong>
				<Part courseParts={props.courseParts}></Part>
			</p>
			<p>
				<strong>{props.courseParts[1].name} {props.courseParts[1].exerciseCount}</strong>
			</p>
			<p>
				<strong>{props.courseParts[2].name} {props.courseParts[2].exerciseCount}</strong>
			</p> */}

			{/* {props.courseParts.map(part => (<Part key={part.name} courseParts={props.courseParts}></Part>))} */}

			<Part courseParts={props.courseParts}></Part>
		</div>
	);
};
export default Content;
