import { expect } from 'storybook/test';
import Table, { TableHead, TableBody, TableRow, TableHeadCell, TableCell } from './Table';
import Badge from '../Badge';

const meta = {
  component: Table,
  tags: ['ai-generated'],
};

export default meta;

export const Default = {
  render: () => (
    <Table hover>
      <TableHead>
        <TableRow>
          <TableHeadCell>#</TableHeadCell>
          <TableHeadCell>Journal Title</TableHeadCell>
          <TableHeadCell>SJR</TableHeadCell>
          <TableHeadCell>Quartile</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Nature Communications</TableCell>
          <TableCell>5.42</TableCell>
          <TableCell><Badge variant="q1" pill>Q1</Badge></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>2</TableCell>
          <TableCell>IEEE Transactions on Pattern Analysis</TableCell>
          <TableCell>6.18</TableCell>
          <TableCell><Badge variant="q1" pill>Q1</Badge></TableCell>
        </TableRow>
        <TableRow>
          <TableCell>3</TableCell>
          <TableCell>PLOS ONE</TableCell>
          <TableCell>0.98</TableCell>
          <TableCell><Badge variant="secondary" pill>Q2</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const Striped = {
  render: () => (
    <Table striped hover compact>
      <TableHead>
        <TableRow>
          <TableHeadCell>Metric</TableHeadCell>
          <TableHeadCell>2024</TableHeadCell>
          <TableHeadCell>2025</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Total Publications</TableCell>
          <TableCell>1,240</TableCell>
          <TableCell>1,480</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Total Citations</TableCell>
          <TableCell>14,500</TableCell>
          <TableCell>18,200</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const CssCheck = {
  render: () => (
    <Table hover>
      <TableHead>
        <TableRow>
          <TableHeadCell>Col 1</TableHeadCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Data 1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvas }) => {
    const table = canvas.getByRole('table');
    await expect(table).toBeInTheDocument();
  },
};
