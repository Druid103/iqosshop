import React, { useState } from 'react';
import { Button, Form, Container, Card, Alert, InputGroup } from 'react-bootstrap';
import { useAppDispatch } from '../../shared/lib/Hooks';
import { signinThunk, signupThunk } from '../../entities/auth/lib/thunks';
import { useNavigate } from 'react-router';
import { Eye, EyeSlash, Book } from 'react-bootstrap-icons';
import styles from './AuthPage.module.scss';

function AuthPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 6) errors.push('Пароль должен быть не менее 6 символов');
    if (!/(?=.*[a-z])/.test(password)) errors.push('Пароль должен содержать строчные буквы');
    if (!/(?=.*[A-Z])/.test(password)) errors.push('Пароль должен содержать заглавные буквы');
    if (!/(?=.*\d)/.test(password)) errors.push('Пароль должен содержать цифры');
    if (!/(?=.*[!@#$%^&*])/.test(password)) errors.push('Пароль должен содержать специальные символы');
    return errors;
  };

  const handleInputChange = (field: string, value: string): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'password') {
      if (!isLogin) {
        setPasswordErrors(validatePassword(value));
      }
    }
    
    setError(null);
  };

  const submitHandler: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    if (!isLogin && !formData.name.trim()) {
      setError('Пожалуйста, введите ваше имя');
      return;
    }

    if (!isLogin && passwordErrors.length > 0) {
      setError('Исправьте ошибки в пароле');
      return;
    }

    setError(null);

    const submitData = new FormData();
    submitData.append('email', formData.email);
    submitData.append('password', formData.password);
    if (!isLogin) {
      submitData.append('name', formData.name);
    }

    const authThunk = isLogin ? signinThunk : signupThunk;
    
    dispatch(authThunk(submitData))
      .unwrap()
      .then((data) => {
        console.log(data.user.name);
        void navigate('/');
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : `Произошла ошибка при ${isLogin ? 'входе' : 'регистрации'}`);
      });
  };

  const toggleAuthMode = (): void => {
    setIsLogin(!isLogin);
    setError(null);
    setPasswordErrors([]);
  };

  const togglePasswordVisibility = (): void => {
    setShowPassword(!showPassword);
  };

  const isSubmitDisabled = !isLogin && passwordErrors.length > 0;

  return (
    <Container className={styles.container}>
      <Card className={styles.card}>
        <Card.Body className={styles.cardBody}>
          <div className={styles.header}>
            <Book size={48} className={styles.logo} />
            <h1 className={styles.title}>
              {isLogin ? 'Вход в BookExplorer' : 'Регистрация в BookExplorer'}
            </h1>
            <p className={styles.subtitle}>
              {isLogin ? 'С возвращением в мир книг!' : 'Присоединяйтесь к сообществу читателей'}
            </p>
          </div>

          {error && (
            <Alert variant="danger" className={styles.alert} dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form onSubmit={submitHandler} className={styles.form}>
            {!isLogin && (
              <Form.Group className="mb-4">
                <Form.Label className={styles.formLabel}>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={styles.formControl}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-4">
              <Form.Label className={styles.formLabel}>Электронная почта</Form.Label>
              <Form.Control
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={styles.formControl}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className={styles.formLabel}>Пароль</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Введите ваш пароль"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={styles.formControl}
                />
                <Button 
                  variant="outline-secondary" 
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                >
                  {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                </Button>
              </InputGroup>
              
              {!isLogin && formData.password && (
                <div className={styles.passwordValidation}>
                  {[
                    { text: 'Не менее 6 символов', valid: formData.password.length >= 6 },
                    { text: 'Строчные и заглавные буквы', valid: /(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) },
                    { text: 'Минимум одна цифра', valid: /(?=.*\d)/.test(formData.password) },
                    { text: 'Специальные символы', valid: /(?=.*[!@#$%^&*])/.test(formData.password) }
                  ].map((rule) => (
                    <div 
                      key={rule.text} 
                      className={`${styles.validationRule} ${rule.valid ? styles.valid : styles.invalid}`}
                    >
                      <div className={styles.validationDot} />
                      {rule.text}
                    </div>
                  ))}
                </div>
              )}
            </Form.Group>

            <Button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitDisabled}
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>

            <div className={styles.switchMode}>
              <p className={styles.switchText}>
                {isLogin ? 'Ещё нет аккаунта?' : 'Уже есть аккаунт?'}
                <Button 
                  variant="link" 
                  onClick={toggleAuthMode}
                  className={styles.switchButton}
                >
                  {isLogin ? 'Зарегистрироваться' : 'Войти'}
                </Button>
              </p>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AuthPage;