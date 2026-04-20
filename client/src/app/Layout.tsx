// Layout.tsx
import { Outlet } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import NavBar from '../widgets/navbar/Navbar';
export default function Layout(): React.JSX.Element {
  return (
    <Container>
      <NavBar />
      <Outlet />
    </Container>
  );
}
