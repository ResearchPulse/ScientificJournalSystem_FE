import { useTranslation } from "react-i18next";
/**
 * File source thuộc hệ thống FE ResearchPulse.
 *
 * File: features\article\components\ArticleStatsCards.jsx
 */
import { Row, Col } from 'react-bootstrap';
import { StatCard } from '@ui';
export default function ArticleStatsCards({
  stats,
  isLoading
}) {
  const {
    t
  } = useTranslation();
  const statItems = [{
    label: t("article.tongBaiBao"),
    value: stats?.totalArticles || 0,
    icon: 'lucide:file-text'
  }, {
    label: 'Open Access',
    value: stats?.openAccessCount || 0,
    icon: 'lucide:unlock'
  }, {
    label: t("article.tongTacGia"),
    value: stats?.authorsCount || 0,
    icon: 'lucide:users'
  }, {
    label: t("typeArea"),
    value: stats?.topicsCount || 0,
    icon: 'lucide:layers'
  }];
  return (
    <Row className="g-3 mb-4">
      {statItems.map((item, index) => (
        <Col key={index} xs={12} sm={6} md={3} className={`reveal-on-scroll delay-${(index + 1) * 100}`}>
          <StatCard
            label={item.label}
            value={item.value}
            icon={item.icon}
            loading={isLoading}
          />
        </Col>
      ))}
    </Row>
  );
}