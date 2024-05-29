const NotificationBox = ({ children, visible }) => [
	<style>{`
		.--hide-alert {
			opacity: 0;
			transform: translateY(-10px);
			transition: opacity 100ms ease-in-out,
						transform 100ms ease-in-out;
		}
		.--show-alert {
			opacity: 1;
			transform: translateY(0);
			transition: opacity 100ms ease-in-out,
						transform 100ms ease-in-out;
		}
	`}</style>,
	<div class={`flex flex-row items-center m-4 bg-white rounded-lg border-2 border-black p-2 ${visible ? "--show-alert" : "--hide-alert"}`}>
		<div class="mx-2 text-csu-green">
			{children}
		</div>
	</div>]

export default NotificationBox;