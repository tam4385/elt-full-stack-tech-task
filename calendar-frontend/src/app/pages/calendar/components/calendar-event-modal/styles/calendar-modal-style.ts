import { css } from '@emotion/react';

export const overlay = css`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
`;
export const content = css`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 10px;
  padding: 20px 24px;
  width: 420px;
  max-width: 92%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 2001;
`;
export const heading = css`
  font-weight: 600;
  font-size: 1.1rem;
`;
export const desc = css`
  color: #555;
  margin-bottom: 4px;
`;
export const label = css`
  font-size: 0.8rem;
  color: #444;
`;
export const input = css`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 6px;
  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
  }
`;
export const row = css`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 6px;
`;
export const btn = css`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #f7f7f7;
`;
export const primary = css`
  ${btn};
  background: #2563eb;
  border-color: #2563eb;
  color: white;
  &:disabled {
    background: #ccc;
    border-color: #ccc;
  }
`;
export const closeX = css`
  position: absolute;
  top: 8px;
  right: 10px;
  background: none;
  border: 0;
  font-size: 18px;
  cursor: pointer;
`;