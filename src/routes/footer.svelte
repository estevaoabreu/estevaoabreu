<footer>
	<p>© 2025 Estêvão Abreu</p>
	<ul>
		<li>
			<a href="mailto:estevao.abreu40@gmail.com" target="_blank">Email</a>
		</li>
		<li>
			<a href="https://www.linkedin.com/in/estevao-abreu/" target="_blank">LinkedIn</a>
		</li>
		<li>
			<a href="https://github.com/estevaoabreu" target="_blank">GitHub</a>
		</li>
		<li>
			<a href="https://www.instagram.com/estevao._.abreu/" target="_blank">Instagram</a>
		</li>
	</ul>
</footer>

<style>
	footer,
	ul {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}

	footer {
		row-gap: 15px;
		justify-content: space-between;
		background-color: var(--black);
		padding-top: 15px;
		padding-bottom: 15px;
		width: 100%;
	}

	ul {
		list-style-type: none;
		justify-content: space-around;
		column-gap: 50px;
		align-items: center;
		margin: 0;
		padding: 0;
		padding-right: 75px;
	}

	footer p {
		padding-left: 75px;
	}

	li {
		text-align: center;
		line-height: 175%;
		display: inline-block;
	}

	li a {
		text-decoration: underline;
		display: inline-block;
	}

	footer p,
	footer a:link,
	footer a:visited,
	footer a:hover,
	footer a:active {
		color: var(--white);
		margin: 0;
	}

	@media screen and (max-width: 1280px) {
		ul {
			padding-right: 50px;
		}

		footer p {
			padding-left: 50px;
		}
	}

	@media screen and (max-width: 720px) {
		footer {
			justify-content: center;
			flex-direction: column;
		}

		ul,
		footer p {
			padding: 0;
		}
	}
</style>
