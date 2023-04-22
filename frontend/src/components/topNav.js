import { Link } from "react-router-dom";
export default function TopNavLink({ title = "Tweet", url = "/" }) {
	return (
		<Link to={url}>
			<div className="flex mb-2 cursor-pointer items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 mr-3"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					/>
				</svg>
				<h1 className="font-bold text-lg">{title}</h1>
			</div>
		</Link>
	);
}
