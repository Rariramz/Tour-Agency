import { useState } from 'react';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Card } from '../../../shared/ui/Card/Card';
import { Col, ColAlign, ColGapSize } from '../../../shared/ui/Col/Col';
import { Heading } from '../../../shared/ui/Heading/Heading';
import { Input } from '../../../shared/ui/Input/Input';
import { Button, ButtonTheme } from '../../../shared/ui/Button/Button';
import { Paragraph, ParagraphAlign } from '../../../shared/ui/Paragraph/Paragraph';
import cls from './AuthorizationPage.module.scss';

const AuthorizationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isRegistration, setIsRegistration] = useState(false);

  const [repeatPassword, setRepeatPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [mobile, setMobile] = useState('');

  const [isErrorShown, setIsErrorShown] = useState(true);

  const signIn = () => console.log('SIGN IN');

  const signUp = () => console.log('SIGN UP');

  return (
    <div className={classNames(cls.authorizationPage)}>
      <Col className={cls.authorizationPageCol} gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
        <Card className={cls.authorizationPageCard}>
          <Col gapSize={ColGapSize.XXL} align={ColAlign.CENTER}>
            <Heading>Authorization</Heading>
            {isRegistration ? (
              <Col gapSize={ColGapSize.XXL}>
                <Col gapSize={ColGapSize.XL}>
                  <Input className={cls.authorizationPageInput} value={name} onChange={setName} placeholder='Name' />
                  <Input className={cls.authorizationPageInput} value={surname} onChange={setSurname} placeholder='Surname' />
                  <Input className={cls.authorizationPageInput} value={mobile} onChange={setMobile} placeholder='Mobile' />
                </Col>
                <Col gapSize={ColGapSize.XL}>
                  <Input className={cls.authorizationPageInput} value={email} onChange={setEmail} placeholder='Email' />
                  <Input error={isErrorShown} className={cls.authorizationPageInput} value={password} onChange={setPassword} placeholder='Password' type="password" />
                  <Input error={isErrorShown} className={cls.authorizationPageInput} value={repeatPassword} onChange={setRepeatPassword} placeholder='Confirm Password' type="password" />
                  {isErrorShown && <Paragraph className={cls.authorizationPageError}>Passwords don't match!</Paragraph>}
                </Col>
              </Col>
            ) : (
              <Col gapSize={ColGapSize.XL}>
                <Input className={cls.authorizationPageInput} value={email} onChange={setEmail} placeholder='Email' />
                <Input className={cls.authorizationPageInput} value={password} onChange={setPassword} placeholder='Password' type="password" />
              </Col>
            )}
            {isRegistration ? (
              <Button theme={ButtonTheme.CONTAIN} fullwidth={true} onClick={signUp}>SIGN UP</Button>
            ) : (
              <Button theme={ButtonTheme.CONTAIN} fullwidth={true} onClick={signIn}>SIGN IN</Button>
            )}
            {isRegistration ? (
              <Paragraph className={cls.authorizationPageLink} align={ParagraphAlign.RIGHT}>
                Already have an account? <strong onClick={() => setIsRegistration(false)}>Sign In!</strong>
              </Paragraph>
            ) : (
              <Paragraph className={cls.authorizationPageLink} align={ParagraphAlign.RIGHT}>
                Don't have an account? <strong onClick={() => setIsRegistration(true)}>Sign Up!</strong>
              </Paragraph>
            )}
          </Col>
        </Card>
      </Col>
    </div>
  );
};

export default AuthorizationPage;
