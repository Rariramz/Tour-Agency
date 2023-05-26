import { useState } from 'react';
import { Col } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { Row, RowAlign } from '../../../shared/ui/Row/Row';
import { Paragraph } from '../../../shared/ui/Paragraph/Paragraph';
import { Search } from '../../../features/search/Search/ui/Search';
import { IconBg } from '../../../shared/ui/IconBg/IconBg';
import NotificationIcon from '../../../shared/assets/notification.svg';
import AvatarIcon from '../../../shared/assets/avatar.svg';
import cls from './Navbar.module.scss';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <Row align={RowAlign.BETWEEN}>
      <Col className={cls.navbarWelcomeCol}>
        <Heading className={cls.navbarWelcomeName}>Hello Maria!</Heading>
        <Paragraph className={cls.navbarWelcomeText}>Welcome back and explore new trips</Paragraph>
      </Col>
      <Search className={cls.navbarSearch} value={searchValue} onChange={setSearchValue} />
      <Row className={cls.navbarAccountIconsRow}>
        <IconBg className={cls.navbarIconBg}><NotificationIcon/></IconBg>
        <AvatarIcon className={cls.navbarAvatar} width={'48'} height={'48'} />
      </Row>
    </Row>
  );
};

export { Navbar };
