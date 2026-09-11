import React from 'react';
import Accordion, { AccordionItem, AccordionHeader, AccordionBody } from './Accordion';
import ActionLink from '../Link';

export default {
  title: 'Components/Accordion',
  component: Accordion,
};

export const Default = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
    <Accordion defaultActiveKey="vol-10">
      <AccordionItem eventKey="vol-10">
        <AccordionHeader
          title="Volume 10"
          badge="2025"
          meta="• 2 issues"
          icon="lucide:folder"
          expandedIcon="lucide:folder-open"
        />
        <AccordionBody>
          <div className="d-flex flex-column gap-2">
            <div className="d-flex align-items-center justify-content-between p-2 border rounded bg-white">
              <span>Issue 6 (2026) • 2 articles</span>
              <ActionLink to="#" icon="lucide:arrow-right">View articles</ActionLink>
            </div>
            <div className="d-flex align-items-center justify-content-between p-2 border rounded bg-white">
              <span>Issue 1 (2025) • 1 article</span>
              <ActionLink to="#" icon="lucide:arrow-right">View articles</ActionLink>
            </div>
          </div>
        </AccordionBody>
      </AccordionItem>

      <AccordionItem eventKey="vol-9">
        <AccordionHeader
          title="Volume 9"
          badge="2024"
          meta="• 4 issues"
          icon="lucide:folder"
          expandedIcon="lucide:folder-open"
        />
        <AccordionBody>
          <div>Issues for Volume 9...</div>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  </div>
);

export const AlwaysOpenMultiple = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
    <Accordion alwaysOpen defaultActiveKey={['vol-10']}>
      <AccordionItem eventKey="vol-10">
        <AccordionHeader title="Volume 10" badge="2025" meta="• 2 issues" />
        <AccordionBody>Nội dung volume 10</AccordionBody>
      </AccordionItem>
      <AccordionItem eventKey="vol-9">
        <AccordionHeader title="Volume 9" badge="2024" meta="• 4 issues" />
        <AccordionBody>Nội dung volume 9</AccordionBody>
      </AccordionItem>
    </Accordion>
  </div>
);
