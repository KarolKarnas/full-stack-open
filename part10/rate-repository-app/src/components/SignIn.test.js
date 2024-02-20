import {
	render,
	screen,
	fireEvent,
	waitFor,
} from '@testing-library/react-native';
import { SignInContainer } from './SignIn';

describe('SignIn', () => {
	describe('SignInContainer', () => {
		it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
			// render the SignInContainer component, fill the text inputs and press the submit button
			const handleOnSubmit = jest.fn();
			render(<SignInContainer handleOnSubmit={handleOnSubmit} />);
			fireEvent.changeText(screen.getByPlaceholderText('Username'), 'kalle');
			fireEvent.changeText(screen.getByPlaceholderText('Password'), 'password');
			fireEvent.press(screen.getByText('Submit'));

			await waitFor(() => {
				// expect the onSubmit function to have been called once and with a correct first argument
				expect(handleOnSubmit).toHaveBeenCalledTimes(1);
				expect(handleOnSubmit.mock.calls[0][0]).toEqual({
					username: 'kalle',
					password: 'password',
				});
			});
		});
	});
});
