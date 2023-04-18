import "../css/App.css";

export default function MenuItem(props) {
	const { title, icon } = props;
	return (
		<div className="flex flex-row hover:bg-slate-300 cursor-pointer rounded-full p-3">
			{icon ?? "Icon"}
			<h1 className="text-xl font-medium px-3">{title ?? "Menu"}</h1>
		</div>
	);
}
