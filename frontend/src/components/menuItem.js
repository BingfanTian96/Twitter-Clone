import "../css/App.css";
import React from 'react';

export default function MenuItem(props) {
	const { title, icon } = props;
	return (
		<div className="flex flex-row hover:bg-slate-300 cursor-pointer rounded-full p-3 items-center">
			{icon ?? "Icon"}
			<h1 className=" text-2xl font-medium px-3">{title ?? "Menu"}</h1>
		</div>
	);
}
