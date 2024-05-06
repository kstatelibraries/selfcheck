const PillBox = ({ title, value }) =>
	<div class={"flex items-center rounded-full border-2 border-text-on-csu-green m-2 py-1 pr-1 text-text-on-csu-green " + (title ? "pl-3" : "pl-1")}>
		{title && <div class="font-extrabold text-xs uppercase text-text-on-csu-green mr-2">{title}</div>}
		<div class="rounded-full w-8 h-8 bg-csu-green flex justify-center items-center text-white">
			{value}
		</div>
	</div>

export default PillBox