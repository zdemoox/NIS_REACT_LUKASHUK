import styled from 'styled-components';

export const ActionButton = styled.button<{
  variant?: 'primary' | 'secondary';
}>`
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  background: ${({ variant }) =>
    variant === 'primary' ? '#1976d2' : 'rgba(25, 118, 210, 0.08)'};
  color: ${({ variant }) => (variant === 'primary' ? '#f8fafc' : '#e2e8f0')};
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    background-color 0.15s ease,
    opacity 0.15s ease;
  margin-right: 0.4rem;
  margin-bottom: 0.4rem;
  white-space: nowrap;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.7);
    background: ${({ variant }) =>
      variant === 'primary' ? '#1e88e5' : 'rgba(148, 163, 184, 0.24)'};
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(15, 23, 42, 0.6);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;
