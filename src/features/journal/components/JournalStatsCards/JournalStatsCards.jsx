import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\journal\components\JournalStatsCards.jsx
 */
import { Row, Col } from 'react-bootstrap';
import { StatCard } from '@ui';

export default function JournalStatsCards({
  stats,
  loading
}) {
  const {
    t
  } = useTranslation();

  const cardData = [{
    title: t("journal.tongJournals"),
    value: stats?.totalJournals ?? 0,
    icon: 'lucide:book-open'
  }, {
    title: 'Q1 Journals',
    value: stats?.q1Journals ?? 0,
    icon: 'lucide:award'
  }, {
    title: t("journal.quocGia"),
    value: stats?.totalCountries ?? 0,
    icon: 'lucide:globe'
  }, {
    title: 'Open Access',
    value: stats?.openAccessJournals ?? 0,
    icon: 'lucide:unlock'
  }];

  return (
    <Row className="g-4 mb-4">
      {cardData.map((item, idx) => (
        <Col lg={3} md={6} xs={12} key={idx} className={`reveal-on-scroll delay-${(idx + 1) * 100}`}>
          <StatCard
            label={item.title}
            value={item.value}
            icon={item.icon}
            loading={loading}
          />
        </Col>
      ))}
    </Row>
  );
}