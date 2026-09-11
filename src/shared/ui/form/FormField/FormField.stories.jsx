import { expect } from 'storybook/test';
import FormField from './FormField';

const meta = {
  component: FormField,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  args: {
    label: 'Publication Year',
    required: true,
    helperText: 'Enter 4-digit Gregorian calendar year',
    children: <input type="number" placeholder="2025" className="form-control" />,
  },
};

export const WithError = {
  args: {
    label: 'DOI Identifier',
    error: 'Please enter a valid DOI prefix (10.xxxx)',
    children: <input type="text" defaultValue="invalid-doi" className="form-control is-invalid" />,
  },
};

export const CssCheck = {
  args: {
    label: 'Journal Name',
    children: <input type="text" placeholder="Name" className="form-control" />,
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText(/journal name/i);
    await expect(label).toBeInTheDocument();
  },
};
