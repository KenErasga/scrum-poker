import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
window.alert = jest.fn();

it('renders without crashing', () => {
  const result = 'Scrum Poker Online';

  const tree = render(<App />);

  expect(tree).toMatchSnapshot()
});
