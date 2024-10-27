const firstName = (input: string) => {
	if (!input.includes(' ')) return input;
	else return input.split(' ')[0];
};

export default firstName;
