import React, { useState } from 'react';
import { numbers, symbols, lowerCaseLetters, upperCaseLetters } from './characters';
import Form from './components/Form';

import './App.css';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const App = () => {
	const [password, setPassword] = useState('');
	const [length, setLength] = useState(6);
	const [includeSymbols, setSymbols] = useState(false);
	const [includeNumbers, setNumbers] = useState(false);
	const [includeLowerCase, setLowerCase] = useState(false);
	const [includeUpperCase, setUpperCase] = useState(false);
	const [excludeSimilarChars, setSimilarChars] = useState(false);
	const [excludeDuplicateChars, setDuplicateChars] = useState(false);
	const [error, setError] = useState(false);
	const [copy, setCopy] = useState(false);

	const onClickGenerate = () => {
		let validChars = '';
		let unique = false;

		if (includeSymbols) {
			validChars += symbols;
		}

		if (includeNumbers) {
			validChars += numbers;
		}

		if (includeLowerCase) {
			validChars += lowerCaseLetters;
		}
		if (includeUpperCase) {
			validChars += upperCaseLetters;
		}
		if (excludeSimilarChars) {
			validChars = validChars
				.split('')
				.filter(
					word =>
						!word.includes('!') &&
						!word.includes('i') &&
						!word.includes('l') &&
						!word.includes('1') &&
						!word.includes('L') &&
						!word.includes('o') &&
						!word.includes('0') &&
						!word.includes('O')
				)
				.join('');
		}
		if (excludeDuplicateChars) {
			if (length > validChars.length) {
				return setError(true);
			}
			unique = true;
		}

		setPassword(passwordGenerator(validChars, unique));
	};

	const onClickCopy = () => {
		copyToClipboard();
		setCopy(true);
	};

	const passwordGenerator = (list, boolean) => {
		let generatedPassword = '';
		const seen = {};
		while (generatedPassword.length < length) {
			const index = Math.floor(Math.random() * list.length);
			if (boolean === true) {
				if (seen[index] !== true) {
					seen[index] = true;
					generatedPassword += list[index];
				} else {
					continue;
				}
			} else {
				generatedPassword += list[index];
			}
		}
		return generatedPassword;
	};

	const copyToClipboard = () => {
		const newTextArea = document.createElement('textarea');
		newTextArea.innerText = password;
		document.body.appendChild(newTextArea);
		newTextArea.select();
		document.execCommand('copy');
		newTextArea.remove();
	};

	return (
		<div className='app'>
			{error && (
				<Alert onClose={() => setError(false)} severity='error' variant='filled'>
					<strong>
						Length has exceed the amount of unique characters. Please reassign the length number or include
						more characters.
					</strong>
				</Alert>
			)}
			{copy && (
				<>
					{setTimeout(() => setCopy(false), 2000)}
					<Alert severity='success' variant='filled'>
						<strong>Copy Success</strong>
					</Alert>
				</>
			)}

			<div className='generator__container'>
				<div className='generator__header'>
					<h1>PW Generator</h1>
				</div>
				<div className='generator__display'>
					<input readOnly value={password} />
					<button disabled={password.length === 0} onClick={onClickCopy}>
						<FileCopyIcon />
					</button>
				</div>
				<div className='generator__length'>
					<label>Length</label>
					<input min={6} type='number' value={length} onChange={event => setLength(event.target.value)} />
				</div>

				<Form
					name='symbols'
					label={'Include Symbols'}
					setChange={setSymbols}
					checked={includeSymbols}
					eg='( e.g. @#$% )'
				/>
				<Form
					name='numbers'
					label={'Include Numbers'}
					setChange={setNumbers}
					checked={includeNumbers}
					eg='( e.g. 123456 )'
				/>
				<Form
					name='lowerCaseChars'
					label={'Include LowerCase Characters'}
					setChange={setLowerCase}
					checked={includeLowerCase}
					eg='( e.g. abcdefgh )'
				/>
				<Form
					name='upperCaseChars'
					label={'Include UpperCase Characters'}
					setChange={setUpperCase}
					checked={includeUpperCase}
					eg='( e.g. ABCDEFGH )'
				/>
				<Form
					name='similarChars'
					label={'Exclude Similar Characters'}
					setChange={setSimilarChars}
					checked={excludeSimilarChars}
					eg='( e.g. i, l, 1, L, o, 0, O )'
				/>
				<Form
					name='duplicateChars'
					label={'Exclude Duplicate Characters'}
					setChange={setDuplicateChars}
					checked={excludeDuplicateChars}
				/>
				<div className='generator__button'>
					<Button
						disabled={
							(!includeLowerCase && !includeUpperCase && !includeNumbers && !includeSymbols) || error
						}
						onClick={onClickGenerate}
					>
						Generate
					</Button>
				</div>
			</div>
		</div>
	);
};

export default App;
