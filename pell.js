function pell() {

	const $             = (tag, props) => Object.assign(document.createElement(tag), props)
	const exec          = (command, value = null) => document.execCommand(command, false, value)
	const fromCamelCase = str => str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, ' $1')
	const ensureHTTP    = url => /^https?:\/\//.test(url) ? url : `http://${url}`

	const actions = [
		[
			['bold', '<b>B</b>'],
			['italic', '<i>I</i>'],
			['underline', '<u>U</u>'],
			['strikeThrough', '<strike>S</strike>'],
		],
		[
			['justifyLeft', '<i class="fa fa-align-left"></i>'],
			['justifyCenter', '<i class="fa fa-align-center"></i>'],
			['justifyRight', '<i class="fa fa-align-right"></i>'],
			['justifyFull', '<i class="fa fa-align-justify"></i>'],
		],
		[
			...[1, 2, 3, 4, 5, 6].map(n => ['Heading ' + n, '<b>H<sub>' + n + '</sub></b>', '<H' + n + '>']),
			['Paragraph', '&#182;', '<P>'],
			['Quote', '&#8220; &#8221;', '<BLOCKQUOTE>'],
			['Code', '&lt;/&gt;', '<PRE>']
		].map(([c, i, format]) => [c, i, () => exec('formatBlock', format)]),
		[
			['insertOrderedList', '&#35;'],
			['insertUnorderedList', '&#8226;'],
			['insertHorizontalRule', '&#8213;'],
		],
		[
			['createLink', '&#128279;', 'link'],
			['insertImage', '&#128247;', 'image']
		].map(([c, i, type]) => [c, i, () => {
			let url = prompt(`Enter the ${type} URL`)
			url && exec(c, ensureHTTP(url))
		}])
	].map(bar => bar.map(([command, icon, action = () => exec(command)]) => ({
		command, icon, action, title: fromCamelCase(command)
	})))

	const $bars = $('div', {className: 'pell-bars'})
	for (let bar of actions) {
		const $bar = $('div', {className: 'pell-bar'})
		for (let {icon, title, action} of bar) {
			$bar.appendChild($('button', {
				title,
				className: "pell-action",
				innerHTML: icon,
				onclick: action
			}))
		}
		$bars.appendChild($bar)
	}

	const $content = $('div', {
		className: 'pell-content',
		contentEditable: true,
		onkeydown: event => event.which !== 9
	})

	const $container = $('div', {className: 'pell'});
	$container.appendChild($bars)
	$container.appendChild($content)
	return $container

}