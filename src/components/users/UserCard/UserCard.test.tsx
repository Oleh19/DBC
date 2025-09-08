import { ALICE_USER } from '@/__mocks__/testData';
import UserCard from '@/components/users/UserCard';
import { fireEvent, render, screen } from '@testing-library/react';

describe('UserCard', () => {
  test('renders user information correctly', () => {
    const onClick = jest.fn();
    render(<UserCard user={ALICE_USER} onClick={onClick} />);

    expect(screen.getByText('Alice Johnson')).toBeTruthy();
    expect(screen.getByText('alice@example.com')).toBeTruthy();
  });

  test('calls onClick with user when clicked', () => {
    const onClick = jest.fn();
    render(<UserCard user={ALICE_USER} onClick={onClick} />);

    fireEvent.click(screen.getByText('Alice Johnson'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(ALICE_USER);
  });

  test('calls onClick when clicking anywhere on card', () => {
    const onClick = jest.fn();
    render(<UserCard user={ALICE_USER} onClick={onClick} />);

    fireEvent.click(screen.getByText('alice@example.com'));

    expect(onClick).toHaveBeenCalledWith(ALICE_USER);
  });

  test('renders avatar with correct src', () => {
    const onClick = jest.fn();
    const { container } = render(<UserCard user={ALICE_USER} onClick={onClick} />);

    const avatar = container.querySelector('img');
    expect(avatar?.getAttribute('src')).toBe(`https://i.pravatar.cc/150?u=${ALICE_USER.email}`);
  });
});
